// Importa las funciones necesarias de Vue Test Utils y otras dependencias
import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';

// Importa el componente que deseas probar
import GameBoard from '../GameBoard.vue';

test('Para nivel fácil. deberíamos ver 12 <article> generados correspondiente a las 12 cartas', async () => {
    // Defina una matriz de URLs de ejemplo
    const urlsArray = ['url1', 'url2', 'url3', 'url4', 'url5', 'url6'];
    const difficultyLevels = {
        easy: {
            x: 4,
            y: 3,
        },
        medium: {
            x: 4,
            y: 6,
        },
        hard: {
            x: 4,
            y: 8,
        },
    };
    // Monta el componente con las propiedades proporcionadas
    const wrapper = mount(GameBoard, {
        props: {
            urlsArray,
            difficulty: 'easy',
            audio: false,
            difficultyLevels
        },
    });
    await wrapper.vm.$nextTick();

    // Obtiene todos los elementos <article> en el componente montado
    const articles = wrapper.findAll('article');

    // Comprueba que se ha generado un elemento <article> por cada elemento en urlsArray
    expect(articles.length).toBe(urlsArray.length * 2);
});
