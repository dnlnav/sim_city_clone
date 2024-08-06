import * as THREE from 'three';
import type { AssetType, MeshType, MetaDataType } from './assetsTypes';

export const ASSETS_IDS = {
	grass: 'grass',
	road: 'road',
	residential: 'residential',
	commercial: 'commercial',
	industrial: 'industrial'
} as const;

const geometry = new THREE.BoxGeometry(1, 1, 1);

const loader = new THREE.TextureLoader();

const loadTexture = (url: string) => {
	const texture = loader.load(url);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(1, 1);
	return texture;
};

const textures = {
	grass: loadTexture('/static/textures/grass.png'),
	residential1: loadTexture('/static/textures/residential1.png'),
	residential2: loadTexture('/static/textures/residential2.png'),
	residential3: loadTexture('/static/textures/residential3.png'),
	commercial1: loadTexture('/static/textures/commercial1.png'),
	commercial2: loadTexture('/static/textures/commercial2.png'),
	commercial3: loadTexture('/static/textures/commercial3.png'),
	industrial1: loadTexture('/static/textures/industrial1.png'),
	industrial2: loadTexture('/static/textures/industrial2.png'),
	industrial3: loadTexture('/static/textures/industrial3.png')
};

const getTopMaterial = () => new THREE.MeshLambertMaterial({ color: 0x555555 });

const getSideMaterial = (textureName: keyof typeof textures) =>
	new THREE.MeshLambertMaterial({ map: textures[textureName].clone() });

const assets: {
	[K in AssetType]: (x: number, y: number, data: MetaDataType) => MeshType;
} = {
	grass: (x, y) => {
		const material = new THREE.MeshLambertMaterial({ color: 0x339933 });
		const mesh = new THREE.Mesh(geometry, material);
		mesh.userData = { id: 'grass', x, y };
		mesh.position.set(x, -0.5, y);
		return mesh as MeshType;
	},
	road: (x, y) => {
		const material = new THREE.MeshLambertMaterial({ color: 0x444440 });
		const mesh = new THREE.Mesh(geometry, material);
		mesh.userData = { id: 'road', x, y };
		mesh.scale.set(1, 0.1, 1);
		mesh.position.set(x, 0.05, y);
		return mesh as MeshType;
	},
	residential: (x, y, data) => createZoneMesh(x, y, data),
	commercial: (x, y, data) => createZoneMesh(x, y, data),
	industrial: (x, y, data) => createZoneMesh(x, y, data)
};

const createZoneMesh = (x: number, y: number, data: MetaDataType) => {
	const textureName = (data.type + data.height) as keyof typeof textures;

	const topMaterial = getTopMaterial();
	const sideMaterial = getSideMaterial(textureName);
	const materialArray = [
		sideMaterial,
		sideMaterial,
		topMaterial,
		topMaterial,
		sideMaterial,
		sideMaterial
	];
	const mesh = new THREE.Mesh(geometry, materialArray);
	mesh.userData = { x, y };
	mesh.scale.set(0.8, (data.height - 0.95) / 2, 0.8);
	mesh.material.forEach((material) => material.map?.repeat.set(1, data.height - 1));
	mesh.position.set(x, (data.height - 0.95) / 4, y);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	return mesh as MeshType;
};

type DataType<T> = { id: T; height?: number };

export const createAssetInstance = <T extends AssetType>(
	{ id: type, height = 0 }: DataType<T>,
	x: number,
	y: number
) => {
	return assets?.[type](x, y, { type, height });
};
