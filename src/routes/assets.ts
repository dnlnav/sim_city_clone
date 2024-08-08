import * as THREE from 'three';
import type { AssetType, MeshType, MetaDataType } from './assetsTypes';

import grassImage from '$lib/textures/grass.png';
import residential1Image from '$lib/textures/residential1.png';
import residential2Image from '$lib/textures/residential2.png';
import residential3Image from '$lib/textures/residential3.png';
import commercial1Image from '$lib/textures/commercial1.png';
import commercial2Image from '$lib/textures/commercial2.png';
import commercial3Image from '$lib/textures/commercial3.png';
import industrial1Image from '$lib/textures/industrial1.png';
import industrial2Image from '$lib/textures/industrial2.png';
import industrialImage from '$lib/textures/industrial3.png';

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

const getTextures = () => ({
	grass: loadTexture(grassImage),
	residential1: loadTexture(residential1Image),
	residential2: loadTexture(residential2Image),
	residential3: loadTexture(residential3Image),
	commercial1: loadTexture(commercial1Image),
	commercial2: loadTexture(commercial2Image),
	commercial3: loadTexture(commercial3Image),
	industrial1: loadTexture(industrial1Image),
	industrial2: loadTexture(industrial2Image),
	industrial3: loadTexture(industrialImage)
});

type textureTypes = keyof ReturnType<typeof getTextures>;

const getTopMaterial = () => new THREE.MeshLambertMaterial({ color: 0x555555 });

const getSideMaterial = (textureName: textureTypes) =>
	new THREE.MeshLambertMaterial({ map: getTextures()[textureName].clone() });

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
	const textureName = (data.type + data.height) as textureTypes;

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
