const OpenAIApi = require("openai");

const openai = new OpenAIApi({
  key: "sk - f4YOroW9QeA2Z9GcIHq0T3BlbkFJDL6qJq77IXQKI9zw9W6X",
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
