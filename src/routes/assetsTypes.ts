import * as THREE from 'three';
import type { ASSETS_IDS } from './assets';

export type AssetType = keyof typeof ASSETS_IDS;

export type MeshType = THREE.Mesh<
	THREE.BoxGeometry,
	THREE.MeshLambertMaterial | THREE.MeshLambertMaterial[],
	THREE.Object3DEventMap
> & {
	userData: { id: AssetType; x: number; y: number };
};

export type MeshZoneType = 'residential' | 'commercial' | 'industrial';

export type MetaDataType = { type: AssetType; height: number };
