import { GoogleGenAI } from '@google/genai';

export async function handler(event, context) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "No API key configured", fallback: true })
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message, conversationHistory } = JSON.parse(event.body || "{}");
    const ai = new GoogleGenAI({ apiKey });
    
    // Create prompt from history and message
    let fullPrompt = `You are the DEZO Growth Assistant. Help users choose the right package based on the DEZO offerings:
- Starter Website: ₹4,999
- Business Growth Website: ₹7,999
- Platform / Database Website: ₹10,000+
- Add-ons (e.g., login, custom db): from ₹3,000 extra
- Free basic digital marketing guidance included with selected packages.
Be concise, friendly, and professional. Always guide them to click the WhatsApp button to contact DEZO when they are ready.

Conversation History:
${conversationHistory.map(h => (h.role === 'user' ? 'User: ' : 'Assistant: ') + h.text).join('\n')}

User: ${message}
Assistant:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
          temperature: 0.5,
      }
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: response.text })
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message, fallback: true })
    };
  }
}
