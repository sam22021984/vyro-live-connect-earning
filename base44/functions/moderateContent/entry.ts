import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { text, image_url, context } = await req.json();

    if (!text && !image_url) {
      return Response.json({ approved: true, flags: [], reason: '' });
    }

    const prompt = `You are a content moderation system for a social live-streaming app called VYRO Live Connect. Review the following user-submitted content for prohibited material.

${text ? `TEXT CONTENT: "${text}"` : 'No text provided.'}
${image_url ? `IMAGE: An image is attached for visual analysis.` : ''}
CONTEXT: ${context || 'profile'} (fields being moderated: username, bio, signature, avatar)

Prohibited categories:
- Hate speech, discrimination, racial slurs, or derogatory language
- Sexual or explicit adult content, nudity references
- Violence, threats, or harm promotion
- Illegal activities, drug dealing, weapons
- Spam, scams, phishing, or deceptive content
- Personal information (phone numbers, real addresses, personal emails)
- Harassment, bullying, or targeted attacks
- Impersonation of other users or public figures
- Political or religious provocation

Analyze the content and respond with a JSON object:`;

    const invokeParams = {
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          approved: { type: "boolean", description: "true if content is safe to publish" },
          flags: { type: "array", items: { type: "string" }, description: "list of violated categories" },
          reason: { type: "string", description: "brief explanation if rejected, empty if approved" }
        }
      }
    };

    if (image_url) {
      invokeParams.file_urls = [image_url];
    }

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM(invokeParams);

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});