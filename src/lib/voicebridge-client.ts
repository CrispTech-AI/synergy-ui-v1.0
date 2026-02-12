import { WEBUI_API_BASE_URL } from '$lib/constants';

let ws: WebSocket | null = null;
let mediaRecorder: MediaRecorder | null = null;

export async function startVoiceBridge(token: string | null = null) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

    // Construct the URL. Use window.location.host for current server.
    const wsUrl = `${protocol}//${window.location.host}${WEBUI_API_BASE_URL}/voice/ws`;

    ws = new WebSocket(wsUrl);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
        console.log('🎙️ VoiceBridge connected.');
    };

    ws.onmessage = (event) => {
        // Log response from Jexi for now
        if (typeof event.data === 'string') {
            try {
                const data = JSON.parse(event.data);
                console.log('🧠 JEXI says (JSON):', data);
            } catch {
                console.log('🧠 JEXI says (Text):', event.data);
            }
        } else {
            console.log('🧠 JEXI says (Binary):', event.data);
        }
    };

    ws.onerror = (err) => {
        console.error('VoiceBridge error:', err);
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0 && ws?.readyState === WebSocket.OPEN) {
                ws.send(event.data);
            }
        };

        mediaRecorder.start(250); // Send audio chunks every 250ms
        console.log('🎤 Mic activated.');
    } catch (err) {
        console.error('Microphone Error:', err);
        throw err;
    }
}

export function stopVoiceBridge() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
    if (ws) {
        ws.close();
    }
    console.log('🛑 VoiceBridge closed.');
}
