const { OpenRouter } = require('@openrouter/sdk');

exports.handler = async function(event, context) {
  console.log('📨 Solicitud recibida:', { method: event.httpMethod, path: event.path });
  
  // Asegúrate de que la solicitud sea POST y tenga un cuerpo
  if (event.httpMethod !== 'POST' || !event.body) {
    console.error('❌ Error: POST sin body');
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed or missing body' }),
    };
  }

  try {
    // Obtén la clave de API de las variables de entorno de Netlify
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('❌ Error: OPENROUTER_API_KEY no configurada');
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'OpenRouter API key not configured.' }),
      };
    }

    console.log('✅ API Key encontrada');

    const openRouter = new OpenRouter({
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': process.env.SITE_URL || 'https://intro.netlify.app',
        'X-Title': 'Intro - Plataforma de Educación Científica',
      },
    });

    // Parsea el cuerpo de la solicitud
    let parsedBody;
    try {
      parsedBody = JSON.parse(event.body);
    } catch (parseErr) {
      console.error('❌ Error parseando JSON:', parseErr);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid JSON in request body.' }),
      };
    }

    const { message, model = 'openai/gpt-3.5-turbo' } = parsedBody;

    if (!message) {
      console.error('❌ Error: Sin mensaje en el body');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing "message" in request body.' }),
      };
    }

    console.log('📝 Mensaje:', message.substring(0, 50) + '...');
    console.log('🤖 Modelo:', model);

    // Llama a la API de OpenRouter
    const completion = await openRouter.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      stream: false,
      max_tokens: 2048,
    });

    console.log('✅ Respuesta recibida de OpenRouter');

    // Devuelve la respuesta
    if (completion.choices && completion.choices[0]?.message?.content) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: completion.choices[0].message.content,
        }),
      };
    } else {
      console.error('❌ Error: Respuesta inválida de OpenRouter', completion);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Invalid response from OpenRouter API.' }),
      };
    }

  } catch (error) {
    console.error('❌ Error en la función:', error);
    console.error('Stack trace:', error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error processing your request.', 
        error: error.message,
        details: error.response?.data || error.toString()
      }),
    };
  }
};
