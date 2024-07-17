const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const token = '6501629314:AAHgLVK_DJyNyS_jECTtnfyJMrP6OY9faK8';
const bot = new TelegramBot(token, { polling: true });

app.use(bodyParser.json());

const formulalar = {
    "5": [
        "Qo'shish va ayirish: a + b = b + a",
        "Qo'shish va ayirish: a - b ≠ b - a",
        "Ko'paytirish va bo'lish: a · b = b · a",
        "Ko'paytirish va bo'lish: a / b ≠ b / a (agar b ≠ 0)",
        "Distributivlik: a · (b + c) = a · b + a · c"
    ],
    "6": [
        "Ko'paytirish va assotsiativ xossasi: a · b = b · a",
        "Ko'paytirish va assotsiativ xossasi: (a · b) · c = a · (b · c)",
        "Manfiy sonlar: a + (-a) = 0",
        "Manfiy sonlar: -a · b = -(a · b)",
        "Manfiy sonlar: -a · -b = a · b"
    ],
    "7": [
        "Algebraik ifoda: (a + b)^2 = a^2 + 2ab + b^2",
        "Algebraik ifoda: (a - b)^2 = a^2 - 2ab + b^2",
        "Algebraik ifoda: (a + b)(a - b) = a^2 - b^2",
        "Kasr: a/b + c/d = (ad + bc) / bd",
        "Kasr: a/b · c/d = ac / bd"
    ],
    "8": [
        "Kvadrat tenglama: ax^2 + bx + c = 0",
        "Diskriminant: D = b^2 - 4ac",
        "Ildizlar (D > 0): x_{1,2} = (-b ± √D) / 2a",
        "Ildizlar (D = 0): x = -b / 2a",
        "Ildizlar (D < 0): haqiqiy ildizlar yo'q"
    ],
    "9": [
        "Kvadrat ildiz: √(a^2) = |a|",
        "Kvadrat ildiz: √(a · b) = √a · √b",
        "Kvadrat ildiz: √(a/b) = √a / √b (agar b ≠ 0)",
        "Logarifm: log_b a = c, agar b^c = a",
        "Logarifm: log_b(a · c) = log_b a + log_b c",
        "Logarifm: log_b(a/c) = log_b a - log_b c"
    ],
    "10": [
        "Kvadrat tenglama: ax^2 + bxy + cy^2 + dx + ey + f = 0",
        "Trigonometrik identiklik: sin^2 x + cos^2 x = 1",
        "Trigonometrik identiklik: sin(a ± b) = sin a cos b ± cos a sin b",
        "Trigonometrik identiklik: cos(a ± b) = cos a cos b ∓ sin a sin b",
        "Arifmetik progressiya: a_n = a_1 + (n-1)d",
        "Arifmetik progressiya: S_n = n/2 (a_1 + a_n)",
        "Geometrik progressiya: a_n = a_1 · r^{n-1}",
        "Geometrik progressiya: S_n = a_1 (r^n - 1) / (r - 1) (agar r ≠ 1)",
        "Eksponent: y = a^x",
        "Logarifm: y = log_a x"
    ],
    "11": [
        "Chiziqli tengsizlik: ax + b > 0",
        "Modulli tengsizlik: |ax + b| = c",
        "Matritsa qo'shish: A + B",
        "Matritsa ko'paytirish: A · B",
        "Determinant (2x2): det(2x2) = ad - bc",
        "Invermatritsa: A^(-1) = (1/det(A)) · adj(A)",
        "Kompleks son: z = a + bi",
        "Modul: |z| = √(a^2 + b^2)",
        "Polinomlar: f(x) + g(x)",
        "Ildizlar: x_1 + x_2 = -b/a",
        "Ildizlar: x_1 x_2 = c/a",
        "To'g'ri chiziq: y = kx + b",
        "Doira: (x - a)^2 + (y - b)^2 = r^2"
    ]
};


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const errorText = "Iltimos notanish so'zlar yozmang.";

    if (text === '/start') {
        const responseText = "Salom! Bu botda siz algebradan formulalarni topishingiz mumkin. Botdan foydalanish uchun pastdagi tugmalardan birini tanlang yoki shunchaki sinf raqamini yuboring. Bizda 5-sinf dan 11-sinfgacha bo'lgan algebra darsligidagi barcha formulalar mavjud."
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '5-sinf', callback_data: '5' },
                        { text: '6-sinf', callback_data: '6' },
                        { text: '7-sinf', callback_data: '7' },
                        { text: '8-sinf', callback_data: '8' },
                        { text: '9-sinf', callback_data: '9' },
                        { text: '10-sinf', callback_data: '10' },
                        { text: '11-sinf', callback_data: '11' },
                    ],
                ],
            },
        };
        bot.sendMessage(chatId, responseText, options);
    } else if (formulalar[text]) {
        bot.sendMessage(chatId, formulalar[text].join('\n'));
    } else if (text >= '5' && text <= '11') {
        bot.sendMessage(chatId, formulalar[text].join('\n'));
    } else if (formulalar[text.slice(1, text.length)]) {
        bot.sendMessage(chatId, formulalar[text.slice(1, text.length)].join('\n'));
    }
    else {
        bot.sendMessage(chatId, errorText);
    }
});

bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    const responseText = formulalar[data] ? formulalar[data].join('\n') : errorText;

    bot.sendMessage(chatId, responseText);
    bot.answerCallbackQuery(callbackQuery.id);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
