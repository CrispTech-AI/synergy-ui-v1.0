import logging
import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from synergy_ui.utils.auth import get_verified_user
from synergy_ui.config import CACHE_DIR

log = logging.getLogger(__name__)
router = APIRouter()

class VoiceManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

voice_manager = VoiceManager()

@router.websocket("/ws")
async def voice_websocket(websocket: WebSocket):
    await voice_manager.connect(websocket)
    try:
        while True:
            # Receive audio data or control signals from the frontend
            data = await websocket.receive_bytes()
            
            # Step 1: STT (Speech to Text)
            # For now, we'll placeholder this. In the final version, 
            # we will route this to Whisper (Groq/Local).
            
            # Step 2: Handle the text as a chat message
            
            # Step 3: TTS (Text to Speech)
            # Route response to Piper/TTS and send back as bytes
            
            await websocket.send_bytes(data) # Loopback for testing
    except WebSocketDisconnect:
        voice_manager.disconnect(websocket)
    except Exception as e:
        log.error(f"Voice WebSocket Error: {e}")
        voice_manager.disconnect(websocket)
