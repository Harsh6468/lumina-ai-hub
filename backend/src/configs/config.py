import os

import dotenv

from logger.logger import LoggerFactory

dotenv.load_dotenv()

class Config(LoggerFactory):
    def __init__(self):
        super().__init__()
        self.logger = self.get_logger("Config")
        self.host: str = os.getenv("HOST", "0.0.0.0")
        self.port: int = int(os.getenv("PORT", "5000"))
        self.reload: bool = os.getenv("RELOAD", "True") == "True"
        self.allowed_origins: str = os.getenv("ALLOWED_ORIGINS", "*")
        self.groq_api_key: str = os.getenv("GROQ_API_KEY", None)
        self.groq_model: str = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")
        self.log_level: str = os.getenv("LOG_LEVEL", "INFO")
