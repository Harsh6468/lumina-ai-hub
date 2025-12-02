from fastapi import APIRouter, status, Request, Depends

from utils.groq_client import GroqClient


router = APIRouter(prefix="/api", tags=["chat"])

def get_groq_client():
    return GroqClient()

@router.get("/health", status_code=status.HTTP_200_OK)
async def health():
    return {"status": "ok"}


@router.post("/chat")
async def chat(request: Request, groq_client: GroqClient = Depends(get_groq_client)):
    data = await request.json()
    messages = data.get("messages", [])
    response = groq_client.generate_response(messages)
    return {"response": response}