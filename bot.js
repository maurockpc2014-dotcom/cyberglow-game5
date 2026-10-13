const { Telegraf, Markup } = require('telegraf');

// ⚠️ PEGA AQUÍ TU TOKEN REAL DE @BOTFATHER
const BOT_TOKEN = 'AQUÍ_PEGA_LOS_NÚMEROS_Y_LETRAS_DE_BOTFATHER'; 
const bot = new Telegraf(BOT_TOKEN);

// Enlace de tu juego (Lo obtendrás en el siguiente paso con Render)
const MINI_APP_URL = 'https://onrender.com'; 

bot.start((ctx) => {
    const mensaje = `🛠️ *¡Bienvenido a CyberGlow Syndicate!*\n\n` +
        `Compra mineros virtuales y gana *USDT* todos los días.\n\n` +
        `*Pasos:*\n` +
        `1. Presiona *🚀 INICIAR JUEGO* abajo.\n` +
        `2. Deposita desde *$5 USDT*.\n` +
        `3. ¡Empieza a minar!\n\n` +
        `⚠️ _Si pasas más de 14 días sin entrar, perderás parte de tu saldo por mantenimiento de red._`;

    return ctx.replyWithMarkdown(
        mensaje,
        Markup.inlineKeyboard([[Markup.button.webApp('🚀 INICIAR JUEGO', MINI_APP_URL)]])
    );
});

bot.launch();
