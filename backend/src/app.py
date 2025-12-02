from __future__ import annotations
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from configs.config import Config
from routes import chat_routes, role_routes 


class AppManager(Config):
    def __init__(self) -> None:
        super().__init__()
        self.app = FastAPI(
            title="Custom ChatGPT",
            description="Role-based Chat assistant (GroqCloud integration)",
            version="1.0.0",
            docs_url="/docs",
            redoc_url="/redoc",
        )
        self._configure()

    def _configure(self) -> None:
        origins = [o.strip() for o in self.allowed_origins.split(",")] if self.allowed_origins != "*" else ["*"]
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        # include routers
        self.app.include_router(chat_routes.router)
        self.app.include_router(role_routes.router)

        # simple root
        @self.app.get("/")
        async def root():
            routes = {
                "message": "Custom ChatGPT API is running successfully.",
                "endpoints": {
                    "chat_api": [
                        {
                            "method": "POST",
                            "url": "/api/chat",
                            "description": "Send a list of messages to the AI model and receive a generated response.",
                            "request_format": {
                                "messages": [
                                    {
                                        "role": "system | user | assistant",
                                        "content": "string"
                                    }
                                ]
                            },
                            "response_format": {
                                "response": "AI generated string response"
                            }
                        },
                        {
                            "method": "GET",
                            "url": "/api/health",
                            "description": "Check if the API server is running properly."
                        }
                    ],
                    "role_api":[
                        {
                            "method": "POST",
                            "url": "/role/add-role",
                            "description": "Adds new role to the database.",
                            "request_format":{
                                "role":{
                                    "id": "role_id",
                                    "category": "role_categories",
                                    "name": "role_name",
                                    "emoji": "emoji",
                                    "description": "role_description",
                                    "color": "background color and border color for tailwind with dark mode and light mode, example: bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800",
                                    "prompt": "prompt"
                                }
                            },
                            "response_format": {
                                "response": {
                                    "role":{
                                    "id": "role_id",
                                    "category": "role_categories",
                                    "name": "role_name",
                                    "emoji": "emoji",
                                    "description": "role_description",
                                    "color": "background color and border color for tailwind with dark mode and light mode, example: bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800",
                                    "prompt": "prompt"
                                }
                                }
                            }
                        }
                    ]
                },
                "docs": {
                    "swagger_ui": "/docs",
                    "redoc": "/redoc"
                }
            }

            return routes


    def get_app(self) -> FastAPI:
        return self.app

app_manager = AppManager()
app = app_manager.get_app()

if __name__ == "__main__":
    host, port, reload_flag = app_manager.host, app_manager.port, app_manager.reload
    app_manager.logger.info(f"Starting server on {host}:{port}, reload={reload_flag}")
    if reload_flag:
        uvicorn.run("app:app", host=host, port=port, reload=reload_flag)
    else:
        uvicorn.run(app, host=host, port=port)
