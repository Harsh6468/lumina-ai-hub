import re
from markdown import markdown
from groq import Groq

from configs.config import Config


class GroqClient(Config):
    def __init__(self):
        super().__init__()
        self.client = Groq(api_key=self.groq_api_key)

    def generate_response(self, user_query: list):
        """
        Generate a response from the Groq API based on user messages.
        user_query: list of dicts like:
            [
                {"role": "system", "content": "You are a friendly doctor."},
                {"role": "user", "content": "I have a sore throat and fever."}
            ]
        """
        try:
            self.logger.info("Sending request to Groq API...")
            chat_completion = self.client.chat.completions.create(
                messages=user_query,
                model=self.groq_model
            )
            response = chat_completion.choices[0].message.content
            self.logger.info("Received response from Groq API.")
            return response

        except Exception as e:
            self.logger.error(f"Groq API request failed: {e}")
            raise
