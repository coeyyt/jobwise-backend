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
