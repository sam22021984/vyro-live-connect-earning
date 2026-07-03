import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action } = body;

    // 1. AI Chat / Text Generation (InvokeLLM)
    if (action === 'chat') {
      const { prompt, response_json_schema, add_context_from_internet, file_urls, model } = body;
      if (!prompt) return Response.json({ error: 'prompt is required' }, { status: 400 });
      const params = { prompt, response_json_schema, add_context_from_internet, file_urls, model };
      const result = await base44.asServiceRole.integrations.Core.InvokeLLM(params);
      return Response.json({ result, action: 'chat' });
    }

    // 2. AI Image Generation
    if (action === 'generateImage') {
      const { prompt, existing_image_urls } = body;
      if (!prompt) return Response.json({ error: 'prompt is required' }, { status: 400 });
      const result = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt, existing_image_urls });
      return Response.json({ url: result.url, action: 'generateImage' });
    }

    // 3. AI Speech (Text-to-Speech)
    if (action === 'generateSpeech') {
      const { text, voice, language_code } = body;
      if (!text) return Response.json({ error: 'text is required' }, { status: 400 });
      const result = await base44.asServiceRole.integrations.Core.GenerateSpeech({ text, voice, language_code });
      return Response.json({ url: result.url, action: 'generateSpeech' });
    }

    // 4. AI Video Generation
    if (action === 'generateVideo') {
      const { prompt, duration, aspect_ratio } = body;
      if (!prompt) return Response.json({ error: 'prompt is required' }, { status: 400 });
      const result = await base44.asServiceRole.integrations.Core.GenerateVideo({ prompt, duration, aspect_ratio });
      return Response.json({ url: result.url, action: 'generateVideo' });
    }

    // 5. Audio Transcription (Speech-to-Text)
    if (action === 'transcribe') {
      const { audio_url } = body;
      if (!audio_url) return Response.json({ error: 'audio_url is required' }, { status: 400 });
      const result = await base44.asServiceRole.integrations.Core.TranscribeAudio({ audio_url });
      return Response.json({ transcript: result, action: 'transcribe' });
    }

    // 6. Data Extraction from File
    if (action === 'extractData') {
      const { file_url, json_schema } = body;
      if (!file_url || !json_schema) return Response.json({ error: 'file_url and json_schema are required' }, { status: 400 });
      const result = await base44.asServiceRole.integrations.Core.ExtractDataFromUploadedFile({ file_url, json_schema });
      return Response.json({ result, action: 'extractData' });
    }

    // 7. File Upload
    if (action === 'uploadFile') {
      const formData = await req.formData();
      const file = formData.get('file');
      if (!file) return Response.json({ error: 'file is required' }, { status: 400 });
      const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });
      return Response.json({ file_url: result.file_url, action: 'uploadFile' });
    }

    // 8. Content Moderation (AI-powered)
    if (action === 'moderate') {
      const { text, image_url, context } = body;
      if (!text && !image_url) {
        return Response.json({ approved: true, flags: [], reason: '' });
      }
      const prompt = `You are a content moderation system for VYRO Live Connect. Review the following content for prohibited material.\n\n${text ? `TEXT: "${text}"` : 'No text.'}\n${image_url ? 'IMAGE attached for analysis.' : ''}\nCONTEXT: ${context || 'profile'}\n\nProhibited: hate speech, sexual content, violence, illegal activities, spam/scams, personal info, harassment, impersonation, political/religious provocation.\n\nRespond with JSON:`;
      const invokeParams = {
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            approved: { type: "boolean" },
            flags: { type: "array", items: { type: "string" } },
            reason: { type: "string" }
          }
        }
      };
      if (image_url) invokeParams.file_urls = [image_url];
      const result = await base44.asServiceRole.integrations.Core.InvokeLLM(invokeParams);
      return Response.json({ ...result, action: 'moderate' });
    }

    // 9. Send Email
    if (action === 'sendEmail') {
      const { to, subject, body: emailBody, from_name } = body;
      if (!to || !subject || !emailBody) return Response.json({ error: 'to, subject, body are required' }, { status: 400 });
      const result = await base44.asServiceRole.integrations.Core.SendEmail({ to, subject, body: emailBody, from_name });
      return Response.json({ success: true, action: 'sendEmail' });
    }

    // List all available AI actions
    if (action === 'list') {
      return Response.json({
        tools: [
          { id: 'chat', name: 'AI Chat / Text Generation', icon: '💬', description: 'Generate text with LLM, supports web search & file analysis', model: true },
          { id: 'generateImage', name: 'AI Image Generation', icon: '🎨', description: 'Generate images from text prompts' },
          { id: 'generateSpeech', name: 'Text-to-Speech', icon: '🔊', description: 'Convert text to natural speech audio' },
          { id: 'generateVideo', name: 'AI Video Generation', icon: '🎬', description: 'Generate videos from text prompts' },
          { id: 'transcribe', name: 'Audio Transcription', icon: '🎙️', description: 'Convert speech audio to text' },
          { id: 'extractData', name: 'File Data Extraction', icon: '📄', description: 'Extract structured data from files (CSV, PDF, images)' },
          { id: 'uploadFile', name: 'File Upload', icon: '📤', description: 'Upload files to cloud storage' },
          { id: 'moderate', name: 'Content Moderation', icon: '🛡️', description: 'AI-powered content safety review' },
          { id: 'sendEmail', name: 'Send Email', icon: '📧', description: 'Send emails via the platform' },
        ]
      });
    }

    return Response.json({ error: 'Invalid action. Available: list, chat, generateImage, generateSpeech, generateVideo, transcribe, extractData, uploadFile, moderate, sendEmail' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});