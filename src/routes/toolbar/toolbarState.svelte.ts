export const buttons = ['bulldoze', 'residential', 'commercial', 'industrial', 'road'] as const;

type ToolbarIdType = (typeof buttons)[number];
type SetToolbarIdType = (tooltId: ToolbarIdType) => void;

export function createToolbarId() {
	let activeToolId: ToolbarIdType = $state('bulldoze');

	const setActiveToolId: SetToolbarIdType = (tooltId) => (activeToolId = tooltId);

	return {
		get activeToolId() {
			return activeToolId;
		},
		setActiveToolId
	};
}
