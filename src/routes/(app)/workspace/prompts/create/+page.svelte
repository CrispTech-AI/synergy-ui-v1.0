<script lang="ts">
	// TypeScript configuration updated - IDE refresh needed
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { prompts } from '$lib/stores';
	import { onMount, getContext } from 'svelte';

	const i18n = getContext('i18n') as any;

	import { createNewPrompt, getPrompts } from '$lib/apis/prompts';
	import PromptEditor from '$lib/components/workspace/Prompts/PromptEditor.svelte';

	let prompt: {
		title: string;
		command: string;
		content: string;
		access_control: Record<string, any> | null;
	} | null = null;

	let clone = false;

	const onSubmit = async (_prompt: {
		title: string;
		command: string;
		content: string;
		access_control?: Record<string, any>;
	}) => {
		const res = await createNewPrompt(localStorage.token, _prompt).catch((error: Error) => {
			toast.error(`${error}`);
			return null;
		});

		if (res) {
			toast.success($i18n.t('Prompt created successfully'));

			await prompts.set(await getPrompts(localStorage.token));
			await goto('/workspace/prompts');
		}
	};

	onMount(async () => {
		window.addEventListener('message', async (event) => {
			console.log(event);
			if (
				!['https://synergyui.com', 'https://www.synergyui.com', 'http://localhost:9999'].includes(
					event.origin
				)
			)
				return;
			const _prompt = JSON.parse(event.data);
			console.log('Received prompt via window message:', _prompt);

			clone = true;
			prompt = {
				title: _prompt.title,
				command: _prompt.command,
				content: _prompt.content,
				access_control: _prompt.access_control !== undefined ? _prompt.access_control : null
			};
		});

		if (window.opener ?? false) {
			window.opener.postMessage('loaded', '*');
		}

		if (sessionStorage.prompt) {
			const _prompt = JSON.parse(sessionStorage.prompt);
			sessionStorage.removeItem('prompt');

			console.log('Received prompt via sessionStorage:', _prompt);

			clone = true;
			prompt = {
				title: _prompt.title,
				command: _prompt.command,
				content: _prompt.content,
				access_control: _prompt.access_control !== undefined ? _prompt.access_control : null
			};
		}
	});
</script>

{#key prompt}
	<PromptEditor {prompt} {onSubmit} />
{/key}
