// GPT3Client.js

const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env file

class GPT3Client {
  constructor() {
    this.endpoint = "https://api.openai.com/v1/engines/davinci/completions";
    this.apiKey = "sk - f4YOroW9QeA2Z9GcIHq0T3BlbkFJDL6qJq77IXQKI9zw9W6X"; // Access the API key from environment variable
  }

  async complete(options) {
    const headers = {
      Authorization: `Bearer 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`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(this.endpoint, options, { headers });
      return response.data;
    } catch (error) {
      console.error(
        "Error with GPT-3 API:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

module.exports = GPT3Client;
