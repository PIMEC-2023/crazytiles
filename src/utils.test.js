// Importa la función shuffleArray
import { shuffleArray, board } from './utils.js';
import { describe, it, expect } from 'vitest';

describe('shuffleArray', () => {
    it('debería mezclar un array de elementos. Tras mezclarlo deberían estar todos los elementos originales', () => {
        // Arrange
        const array = [1, 2, 3, 4, 5];

        // Act
        shuffleArray(array);

        // Verifica que todos los elementos originales estén presentes después de la mezcla
        expect(array.sort()).toEqual([1, 2, 3, 4, 5]);
    });

    it('debería manejar un array vacío sin errores', () => {
        // Arrange
        const array = [];

        // Act
        shuffleArray(array);

        // Assert
        // Verifica que el array sigue siendo vacío después de la mezcla
        expect(array).toEqual([]);
    });

    it('debería manejar un array con un solo elemento sin errores', () => {
        // Arrange
        const array = [42];

        // Act
        shuffleArray(array);

        // Assert
        // Verifica que el array sigue conteniendo el mismo elemento después de la mezcla
        expect(array).toEqual([42]);
    });
});

describe('board', () => {
    it('genera un array que es la multiplicación de filas y columnas', () => {
        // Arrange
        const x = 2;
        const y = 4;
        const arrayImgs = ['img1', 'img2', 'img3', 'img4'];

        // Act
        const result = board(x, y, arrayImgs);

        // Assert
        expect(result).toHaveLength(x * y);
    });

    it('el array generado contiene dos copias de cada uno de los elementos del mismo', () => {
        // Arrange
        const x = 2;
        const y = 4;
        const arrayImgs = ['img1', 'img2', 'img3', 'img4'];

        // Act
        const result = board(x, y, arrayImgs);

        // Assert
        arrayImgs.forEach((img) => {
            const occurrences = result.filter((item) => item === img).length;
            expect(occurrences).toBe(2);
        });
    });


});