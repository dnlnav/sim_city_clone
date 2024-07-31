import { BoxGeometry, Mesh, MeshLambertMaterial, type Object3DEventMap } from 'three';

export const ASSETS_IDS = {
	grass: 'grass',
	road: 'road',
	residential: 'residential',
	commercial: 'commercial',
	industrial: 'industrial'
} as const;

export type AssetType = keyof typeof ASSETS_IDS;

export type MeshType = Mesh<BoxGeometry, MeshLambertMaterial, Object3DEventMap> & {
	userData: { id: AssetType; x: number; y: number };
};

const geometry = new BoxGeometry(1, 1, 1);
const assets: { [K in AssetType]: (x: number, y: number) => MeshType } = {
	grass: (x, y) => {
		const material = new MeshLambertMaterial({ color: 0x339933 });
		const mesh = new Mesh(geometry, material);
		mesh.userData = { id: 'grass', x, y };
		mesh.position.set(x, -0.5, y);
		return mesh as MeshType;
	},
	road: (x, y) => {
		const material = new MeshLambertMaterial({ color: 0x444440 });
		const mesh = new Mesh(geometry, material);
		mesh.userData = { id: 'road', x, y };
		mesh.scale.set(1, 0.1, 1);
		mesh.position.set(x, 0.05, y);
		return mesh as MeshType;
	},
	residential: (x, y) => {
		const material = new MeshLambertMaterial({ color: 0x00ff00 });
		const mesh = new Mesh(geometry, material);
		mesh.position.set(x, 0.5, y);
		mesh.userData = { id: 'residential', x, y };
		return mesh as MeshType;
	},
	commercial: (x, y) => {
		const material = new MeshLambertMaterial({ color: 0x0000ff });
		const mesh = new Mesh(geometry, material);
		mesh.position.set(x, 0.5, y);
		mesh.userData = { id: 'commercial', x, y };
		return mesh as MeshType;
	},
	industrial: (x, y) => {
		const material = new MeshLambertMaterial({ color: 0xffff00 });
		const mesh = new Mesh(geometry, material);
		mesh.position.set(x, 0.5, y);
		mesh.userData = { id: 'industrial', x, y };
		return mesh as MeshType;
	}
};

export const createAssetInstance = (id: keyof typeof assets, x: number, y: number) => {
	return assets?.[id](x, y);
};
