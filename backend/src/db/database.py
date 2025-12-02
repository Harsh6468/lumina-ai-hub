import os
from motor.motor_asyncio import AsyncIOMotorClient
from configs.config import Config

class Pipeline(Config):
    def __init__(self):
        super().__init__()
        self.initialize_client()
        self.db = self.client["custom_chatgpt"]
        self.collection = self.db["personas"]
    
    def initialize_client(self):
        MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        self.client = AsyncIOMotorClient(MONGODB_URI)
    
    async def add_role(self, role):
        if not role:
            self.logger.error("Role is empty. Cannot insert.")
            return None
        
        result = await self.collection.insert_one(role)
        self.logger.info(f"Role added successfully. ID: {result.inserted_id}")
        saved_role = {
            **role,
            "_id": str(result.inserted_id)
        }
        return saved_role

    async def get_roles(self):
        cursor = self.collection.find({})
        roles = await cursor.to_list(length=None)
        for r in roles:
            r["_id"] = str(r["_id"])
        return roles
