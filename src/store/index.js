import {init} from '@rematch/core';
import {settings} from './models/settings';
import {imageFeed} from './models/imageFeed';

const models = {
    settings,
    imageFeed,
}

const store = init({
    models,
});

export default store;