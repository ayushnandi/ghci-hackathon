from livekit.agents import function_tool
import httpx
import os

@function_tool
async def get_relationships(self) -> dict:
    """
    Get all user's relationships.
    AI MAY use this tool to view the user's saved relationships.
    """
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{os.getenv("BACKEND_URL")}/api/v1/protected/agent/relationship")
    return resp.json()
