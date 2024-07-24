import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three';

const geometry = new BoxGeometry(1, 1, 1);
const assets = {
	grass: (x: number, y: number) => {
		const material = new MeshLambertMaterial({ color: 0x009900 });
		const mesh = new Mesh(geometry, material);
		mesh.position.set(x, -0.5, y);
	},
	building_1: (x: number, y: number) => {
		const material = new MeshLambertMaterial({ color: 0x777777 });
		const mesh = new Mesh(geometry, material);
		mesh.position.set(x, 0.5, y);
		return mesh;
	},
	building_2: (x: number, y: number) => {
		const material = new MeshLambertMaterial({ color: 0x777777 });
		const mesh = new Mesh(geometry, material);
		mesh.scale.set(1, 2, 1);
		mesh.position.set(x, 1, y);
		return mesh;
	},
	building_3: (x: number, y: number) => {
		const material = new MeshLambertMaterial({ color: 0x777777 });
		const mesh = new Mesh(geometry, material);
		mesh.position.set(x, 1.5, y);
		mesh.scale.set(1, 3, 1);
		return mesh;
	}
};

export const createAssetInstance = (id: keyof typeof assets, x: number, y: number) => {
	return assets?.[id](x, y);
};
