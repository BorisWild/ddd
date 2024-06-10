import homeURL from '../homeURL.js';

export const PI = 3.1415926535;
const distSceneY = 1.45 + (560/2)/100;
const distSceneZ = 4;

const defDistX = 0; //5
const defDistY = 0; //3.55 //1
const defDistZ = 0; //1

export const baseURL = homeURL+'/';
export const backBaseURL = 'https://api.drimo.dev-2-tech.ru/';
export const backBaseURL5000 = 'https://auth.drimo.dev-2-tech.ru';

export const config = {
	PI : PI,
	fq : 0.1, 
	distSceneY : distSceneY,
	distSceneZ : distSceneZ,
	sizeRatio : 100,
	distX : defDistX,
	distY : defDistY,
	distZ : defDistZ,
}

export const SIZE_STANDART = {
	panel : [ 125, 270, 415, 560 ],
	profile : [ 125, 270, 415, 560 ],
	ceil : [ 125, 270, 415, 560 ],
}


export const PI_90 = PI/2;
