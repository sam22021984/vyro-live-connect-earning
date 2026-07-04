import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Route a user request to the right AI capability using LLM
async function orchestrate(base44: any, userRequest: string, context?: any) {
  const routingPrompt = `You are an AI orchestrator. Analyze the user request and determine which AI tool(s) to use.

User Request: "${userRequest}"

Available tools:
- chat: Text generation, Q&A, reasoning, code, analysis
- generateImage: Create images from text descriptions
- generateSpeech: Convert text to audio speech
- generateVideo: Create videos from text
- transcribe: Convert audio to text
- moderate: Check content safety

Respond with JSON containing:
- tool: the single best tool id from the list above
- prompt: the refined prompt to pass to that tool
- explanation: brief reason for the choice`;

  const routing = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt: routingPrompt,
    response_json_schema: {
      type: "object",
      properties: {
        tool: { type: "string", enum: ["chat", "generateImage", "generateSpeech", "generateVideo", "transcribe", "moderate"] },
        prompt: { type: "string" },
        explanation: { type: "string" }
      },
      required: ["tool", "prompt", "explanation"]
    }
  });

  return routing;
}

// Execute the selected AI tool
async function executeTool(base44: any, tool: string, prompt: string, params: any = {}) {
  switch (tool) {
    case 'chat':
      return await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: params.response_json_schema,
        add_context_from_internet: params.add_context_from_internet,
        file_urls: params.file_urls,
        model: params.model,
      });
    case 'generateImage':
      return { url: (await base44.asServiceRole.integrations.Core.GenerateImage({ prompt, existing_image_urls: params.existing_image_urls })).url };
    case 'generateSpeech':
      return { url: (await base44.asServiceRole.integrations.Core.GenerateSpeech({ text: prompt, voice: params.voice, language_code: params.language_code })).url };
    case 'generateVideo':
      return { url: (await base44.asServiceRole.integrations.Core.GenerateVideo({ prompt, duration: params.duration, aspect_ratio: params.aspect_ratio })).url };
    case 'transcribe':
      return { transcript: await base44.asServiceRole.integrations.Core.TranscribeAudio({ audio_url: prompt }) };
    case 'moderate':
      return await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `Review this content for safety: "${prompt}". Respond with approved (boolean), flags (array), reason (string).`,
        response_json_schema: { type: "object", properties: { approved: { type: "boolean" }, flags: { type: "array", items: { type: "string" } }, reason: { type: "string" } } }
      });
    default:
      return { error: `Unknown tool: ${tool}` };
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // 1. Orchestrate — route request to best AI tool, execute, store result
    if (action === 'orchestrate') {
      const { request: userRequest, params, conversation_id } = body;
      if (!userRequest) return Response.json({ error: 'request is required' }, { status: 400 });

      // Step 1: Route to best tool
      const routing = await orchestrate(base44, userRequest);

      // Step 2: Execute the tool
      const result = await executeTool(base44, routing.tool, routing.prompt, params || {});

      // Step 3: Store log via Base44 entity
      const convId = conversation_id || crypto.randomUUID();
      let logId = null;
      try {
        const logEntry = await base44.asServiceRole.entities.AiOrchestratorLog.create({
          user_id: user.id,
          conversation_id: convId,
          request: userRequest,
          tool_used: routing.tool,
          routing_explanation: routing.explanation,
          result: typeof result === 'string' ? { text: result } : result,
        });
        logId = logEntry?.id || null;
      } catch (_e) {
        // Logging failure should not block the response
      }

      return Response.json({
        success: true,
        tool: routing.tool,
        explanation: routing.explanation,
        result,
        log_id: logId,
        conversation_id: convId,
      });
    }

    // 2. Get conversation history
    if (action === 'history') {
      const { conversation_id } = body;
      const logs = conversation_id
        ? await base44.asServiceRole.entities.AiOrchestratorLog.filter({ conversation_id }, '-created_date', 100)
        : await base44.asServiceRole.entities.AiOrchestratorLog.filter({ user_id: user.id }, '-created_date', 50);
      return Response.json({ history: logs });
    }

    // 3. Direct tool execution — skip routing, run a specific tool
    if (action === 'execute') {
      const { tool, prompt, params: execParams } = body;
      if (!tool || !prompt) return Response.json({ error: 'tool and prompt are required' }, { status: 400 });

      const result = await executeTool(base44, tool, prompt, execParams || {});

      const convId = body.conversation_id || crypto.randomUUID();
      try {
        await base44.asServiceRole.entities.AiOrchestratorLog.create({
          user_id: user.id,
          conversation_id: convId,
          request: prompt,
          tool_used: tool,
          routing_explanation: 'direct_execution',
          result: typeof result === 'string' ? { text: result } : result,
        });
      } catch (_e) {}

      return Response.json({ success: true, tool, result, conversation_id: convId });
    }

    // 4. List available tools
    if (action === 'list') {
      return Response.json({
        tools: [
          { id: 'chat', name: 'AI Chat', icon: '💬', description: 'Text generation, Q&A, reasoning' },
          { id: 'generateImage', name: 'Image Generation', icon: '🎨', description: 'Create images from text' },
          { id: 'generateSpeech', name: 'Text-to-Speech', icon: '🔊', description: 'Convert text to audio' },
          { id: 'generateVideo', name: 'Video Generation', icon: '🎬', description: 'Create videos from text' },
          { id: 'transcribe', name: 'Audio Transcription', icon: '🎙️', description: 'Convert audio to text' },
          { id: 'moderate', name: 'Content Moderation', icon: '🛡️', description: 'Check content safety' },
        ],
        actions: ['orchestrate', 'execute', 'history', 'list']
      });
    }

    return Response.json({ error: 'Invalid action. Available: orchestrate, execute, history, list' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});