import logging
import asyncio
import os
import tempfile
import torch
import whisper
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from synergy_ui.config import CACHE_DIR

log = logging.getLogger(__name__)
router = APIRouter()

# Load Whisper model (Lazy load to save memory)
_whisper_model = None

def get_whisper_model():
    global _whisper_model
    if _whisper_model is None:
        log.info("Loading Whisper model...")
        device = "cuda" if torch.cuda.is_available() else "cpu"
        _whisper_model = whisper.load_model("base", device=device)
    return _whisper_model

class VoiceManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

voice_manager = VoiceManager()

@router.websocket("/ws")
async def voice_websocket(websocket: WebSocket):
    await voice_manager.connect(websocket)
    model = get_whisper_model()
    
    try:
        while True:
            # Receive audio data from the frontend (PCM/WAV bytes)
            data = await websocket.receive_bytes()
            
            if len(data) < 100: # Control signal or too small
                continue

            # Save to temp file for Whisper to process
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
                tmp.write(data)
                tmp_path = tmp.name

            try:
                # Transcribe audio
                result = model.transcribe(tmp_path, fp16=False)
                text = result["text"].strip()
                
                if text:
                    log.info(f"STT Result: {text}")
                    # Send transcription back to frontend
                    await websocket.send_json({"type": "transcription", "text": text})
                    
                    # TODO: Trigger chat completion here or let frontend handle it
                    
            finally:
                if os.path.exists(tmp_path):
                    os.remove(tmp_path)
                    
    except WebSocketDisconnect:
        voice_manager.disconnect(websocket)
    except Exception as e:
        log.error(f"Voice WebSocket Error: {e}")
        voice_manager.disconnect(websocket)
