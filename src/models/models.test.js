import Top100 from './Top100';

describe('Top 100 list tests', () => {
    const top100 = new Top100();

    test('New list should have 100 items', () => {
        expect(top100.getList().length).toBe(100);
    });

    // test('Filter by price $$$ should return list filtered by price', () => {
    //     top100.addFilter('Price', '$$$');
    //     expect(top100.getList().length).toBe(18);
    //     let idx = Math.floor(Math.random() * (top100.getList().length) - 1);
    //     expect(top100.getList()[idx].Price).toBe('$$$');
    // });

    // test('You can only add one filter per type at a time', () => {
    //     expect(top100.addFilter('Price', '$')).toBe(undefined);
    // });

    // test('Filtering further by Cuisine should return sub list', () => {
    //     top100.addFilter('Cuisine', 'Southern');
    //     expect(top100.getList().length).toBe(1);
    // });


});