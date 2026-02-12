<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { onMount, createEventDispatcher } from 'svelte';
    import XMark from '$lib/components/icons/XMark.svelte';
    import Voice from '$lib/components/icons/Voice.svelte';
	import { startVoiceBridge, stopVoiceBridge } from '$lib/voicebridge-client';

	const dispatch = createEventDispatcher();

	export let active = false;
	export let className = 'p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20';

	let stream: MediaStream | null = null;
	let audioContext: AudioContext | null = null;
    let visualizerData = Array(50).fill(0);

	const connect = async () => {
        try {
            await startVoiceBridge();
            console.log('VoiceBridge: Link Established');
            toast.success('VoiceBridge: Connected');
            
            // Re-setup visualizer local to component for UI feedback
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            source.connect(analyser);
            
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const updateVisualizer = () => {
                if (!active) return;
                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                visualizerData = [...visualizerData.slice(1), average / 128];
                requestAnimationFrame(updateVisualizer);
            };
            updateVisualizer();
        } catch (err) {
            console.error('Core Link Failure:', err);
            toast.error('VoiceBridge Connection Error');
            active = false;
        }
	};

	const cleanup = () => {
		stopVoiceBridge();
		if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        if (audioContext) {
            audioContext.close();
        }
	};

	$: if (active) {
		connect();
	} else {
		cleanup();
	}

	onMount(() => {
		return () => cleanup();
	});
</script>

{#if active}
	<div class="flex items-center gap-4 {className}">
		<div class="flex items-center gap-2">
            <div class="p-2 bg-indigo-500 rounded-full animate-pulse">
                <Voice className="size-5 text-white" />
            </div>
            <div class="flex flex-col">
                <span class="text-sm font-bold text-indigo-600 dark:text-indigo-400">JEXI LIVE BRIDGE</span>
                <span class="text-xs text-gray-500">Listening to the Pulse...</span>
            </div>
        </div>

        <div class="flex-1 flex items-end gap-1 h-8">
            {#each visualizerData as value}
                <div 
                    class="w-1 bg-indigo-500/40 rounded-full" 
                    style="height: {Math.max(10, value * 100)}%"
                ></div>
            {/each}
        </div>

        <button 
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition"
            on:click={() => active = false}
        >
            <XMark className="size-5" />
        </button>
	</div>
{/if}
