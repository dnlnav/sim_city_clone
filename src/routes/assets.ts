import { BoxGeometry, Mesh, MeshLambertMaterial, Object3D, type Object3DEventMap } from 'three';

export const ASSETS_IDS = {
	grass: 'grass',
	building_1: 'building_1',
	building_2: 'building_2',
	building_3: 'building_3'
} as const;

export type AssetType = keyof typeof ASSETS_IDS;

export type MeshType = Mesh<BoxGeometry, MeshLambertMaterial, Object3DEventMap>;

const geometry = new BoxGeometry(1, 1, 1);
const assets: { [K in AssetType]: (x: number, y: number) => MeshType } = {
	grass: (x, y) => {
		const material = new MeshLambertMaterial({ color: 0x009900 });
		const mesh = new Mesh(geometry, material);
		mesh.userData = { id: 'grass' };
		mesh.position.set(x, -0.5, y);
		return mesh;
	},
	building_1: (x, y) => {
		const material = new MeshLambertMaterial({ color: 0x777777 });
		const mesh = new Mesh(geometry, material);
		mesh.position.set(x, 0.5, y);
		mesh.userData = { id: 'building_1' };
		return mesh;
	},
	building_2: (x, y) => {
		const material = new MeshLambertMaterial({ color: 0x777777 });
		const mesh = new Mesh(geometry, material);
		mesh.scale.set(1, 2, 1);
		mesh.position.set(x, 1, y);
		mesh.userData = { id: 'building_2' };
		return mesh;
	},
	building_3: (x, y) => {
		const material = new MeshLambertMaterial({ color: 0x777777 });
		const mesh = new Mesh(geometry, material);
		mesh.position.set(x, 1.5, y);
		mesh.scale.set(1, 3, 1);
		mesh.userData = { id: 'building_3' };
		return mesh;
	}
};

export const createAssetInstance = (id: keyof typeof assets, x: number, y: number) => {
	return assets?.[id](x, y);
};
