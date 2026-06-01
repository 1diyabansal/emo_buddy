const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateReply(message) {

    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content:
                    "You are EmoBuddy, a supportive emotional AI companion.",
            },
            {
                role: "user",
                content: message,
            },
        ],
    });

    return completion.choices[0].message.content;
}

module.exports = { generateReply };