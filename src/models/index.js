import Top100 from './Top100';

const getTop100 = () => {
    return new Top100();
};

const getMeta = () => {
    return require('../data/meta.json');
};

export default {
    getMeta,
    getTop100,
}