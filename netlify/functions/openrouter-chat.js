
exports.handler = async function(event) {
  try {
    console.log('📨 Solicitud recibida:', { method: event.httpMethod, path: event.path });

    if (event.httpMethod !== 'POST' || !event.body) {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed or missing body' }),
      };
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'OpenRouter API key not configured.' }),
      };
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid JSON in request body.' }),
      };
    }

    // Logging de entrada
    console.log('🔵 Mensaje recibido:', body.message);
    console.log('🔵 Modelo:', body.model);

    // Llamada HTTP directa a OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'https://quark-charm.cl',
        'X-Title': 'quark-charm.cl',
      },
      body: JSON.stringify({
        model: body.model || 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: body.message,
          },
        ],
        stream: false,
        max_tokens: 2048,
      })
    });

    const data = await response.json();
    console.log('🟢 Respuesta OpenRouter:', JSON.stringify(data));

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data })
      };
    }

    if (data.choices && data.choices[0]?.message?.content) {
      return {
        statusCode: 200,
        body: JSON.stringify({ response: data.choices[0].message.content })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Invalid response from OpenRouter API.', data })
      };
    }
  } catch (error) {
    console.error('❌ Error en función:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
