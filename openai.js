const OpenAIApi = require("openai");

const openai = new OpenAIApi({
  key: "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",
});
async function generateCustomizedResume(promptContent) {
  try {
    const messages = [
      {
        role: "user",
        content: promptContent,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
    });

    return response.choices[0].message;
  } catch (error) {
    console.error("OpenAI API error: ", error);
    throw error;
  }
}

module.exports = { generateCustomizedResume };
