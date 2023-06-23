export const NUMBERS_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const LETTERS_ARRAY = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

export const getRandomElement = (array: any[]) => {
	const index = Math.floor(Math.random() * array.length);
	return { element: array[index], index };
}

export const randomizeArray = (array: (number | string)[], count: number): (number | string)[] => {
	let randomizedArray: (number | string)[] = [];
	for (let i = 0; i < count; i++) {
		const { element, index } = getRandomElement(array);
		randomizedArray.push(element);
		array.splice(index, 1);
	}
	return randomizedArray;
}

export function ordenarString(str: string) {
	const numeros = str.match(/\d/g)!.sort((a: any, b: any) => a - b);
	const letras = str.match(/[a-zA-Z]/g)!.sort();

	const resultado = [];
	let numIndex = 0;
	let letraIndex = 0;

	for (let i = 0; i < str.length; i++) {
		if (/\d/.test(str[i])) {
			resultado.push(numeros[numIndex]);
			numIndex++;
		} else {
			resultado.push(letras[letraIndex]);
			letraIndex++;
		}
	}

	return resultado.join('');
}