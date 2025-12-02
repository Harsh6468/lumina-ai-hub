from fastapi import APIRouter, Depends
from db.database import Pipeline

def get_pipeline():
    db = Pipeline()
    try:
        yield db
    finally:
        db.client.close()

router = APIRouter(prefix="/roles", tags=["role"])

@router.post("/add-role")
async def add_role(role: dict, db: Pipeline = Depends(get_pipeline)):
    return await db.add_role(role)

@router.get("/get-roles")
async def get_roles(db: Pipeline = Depends(get_pipeline)):
    return await db.get_roles()
