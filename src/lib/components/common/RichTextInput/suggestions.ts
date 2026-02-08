import { onMount, onDestroy } from 'svelte';
import tippy, { type Instance as TippyInstance } from 'tippy.js';

/**
 * Svelte 5–compatible suggestion renderer
 * Replaces deprecated `svelte/legacy` createClassComponent
 */
export function getSuggestionRenderer(Component: any, ComponentProps: Record<string, any> = {}) {
	return function suggestionRenderer() {
		let component: any = null;
		let componentInstance: any = null;
		let container: HTMLDivElement | null = null;

		let popup: TippyInstance | null = null;
		let refEl: HTMLDivElement | null = null;

		return {
			onStart: (props: any) => {
				container = document.createElement('div');
				container.className = 'suggestion-list-container';
				document.body.appendChild(container);

				// Mount Svelte component (Svelte 5 API)
				const componentInstance = new Component({
					target: container,
					props: {
						char: props?.text,
						query: props?.query,
						command: (item: any) => {
							props.command({ id: item.id, label: item.label });
						},
						...ComponentProps
					},
					context: new Map<string, any>([
						['i18n', ComponentProps?.i18n]
					])
				});

				// Dummy reference element to anchor the tooltip
				refEl = document.createElement('div');
				Object.assign(refEl.style, {
					position: 'fixed',
					left: '0px',
					top: '0px',
					width: '0px',
					height: '0px'
				});
				document.body.appendChild(refEl);

				popup = tippy(refEl, {
					getReferenceClientRect: props.clientRect as any,
					appendTo: () => document.body,
					content: container,
					interactive: true,
					trigger: 'manual',
					theme: 'transparent',
					placement: 'top-start',
					offset: [-10, -2],
					arrow: false,
					popperOptions: {
						strategy: 'fixed',
						modifiers: [
							{
								name: 'preventOverflow',
								options: {
									boundary: 'viewport',
									altAxis: true,
									tether: true,
									padding: 8
								}
							},
							{
								name: 'flip',
								options: {
									boundary: 'viewport',
									fallbackPlacements: ['top-end', 'bottom-start', 'bottom-end']
								}
							},
							{
								name: 'computeStyles',
								options: { adaptive: true }
							}
						]
					},
					interactiveBorder: 8
				});

				popup.show();
			},

			onUpdate: (props: any) => {
				if (!component) return;

				component.$set?.({
					query: props.query,
					command: (item: any) => {
						props.command({ id: item.id, label: item.label });
					}
				});

				if (props.clientRect && popup) {
					popup.setProps({
						getReferenceClientRect: props.clientRect as any
					});
				}
			},

			onKeyDown: (props: any) => {
				// Forward key handling to component if exposed
				return component?.onKeyDown?.(props.event) ?? false;
			},

			onExit: () => {
				popup?.destroy();
				popup = null;

				try {
					if (componentInstance) componentInstance.$destroy();
				} catch (e) {
					console.error('Error unmounting suggestion component:', e);
				}

				component = null;

				if (container?.parentNode) container.parentNode.removeChild(container);
				container = null;

				if (refEl?.parentNode) refEl.parentNode.removeChild(refEl);
				refEl = null;
			}
		};
	};
}
