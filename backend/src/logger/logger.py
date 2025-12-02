import logging
import sys
from pathlib import Path
from logging.handlers import RotatingFileHandler
from datetime import datetime


class LoggerFactory:
    def __init__(self):
        self.log_dir = Path(__file__).resolve().parent.parent / "logs"
        self.max_bytes = 5 * 1024 * 1024
        self.backup_count = 3

    def _get_formatter(self) -> logging.Formatter:
        return logging.Formatter("[%(asctime)s] %(levelname)s: %(message)s")

    def _create_file_handler(self, log_file: Path, level: int) -> RotatingFileHandler:
        handler = RotatingFileHandler(
            log_file,
            maxBytes=self.max_bytes,
            backupCount=self.backup_count,
            encoding="utf-8"
        )
        handler.setFormatter(self._get_formatter())
        handler.setLevel(level)
        return handler

    def _create_console_handler(self, level: int) -> logging.StreamHandler:
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(self._get_formatter())
        handler.setLevel(level)
        return handler

    def get_logger(self, name: str, level: str | int = "INFO") -> logging.Logger:
        if isinstance(level, str):
            level = getattr(logging, level.upper(), logging.INFO)

        logger = logging.getLogger(name)

        if logger.handlers:
            return logger

        logger.setLevel(level)

        self.log_dir.mkdir(parents=True, exist_ok=True)
        log_file = self.log_dir / f"{datetime.utcnow():%Y-%m-%d}.log"

        logger.addHandler(self._create_console_handler(level))
        logger.addHandler(self._create_file_handler(log_file, level))

        logger.propagate = False
        return logger
