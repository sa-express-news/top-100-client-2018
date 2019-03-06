import Top100 from './Top100';

describe('Top 100 list tests', () => {
    const top100 = new Top100();

    test('New list should have 100 items', () => {
        expect(top100.getList().length).toBe(100);
    });

    test('Filter by price $$$ should return list filtered by price', () => {
        top100.addExactFilter('Price', '$$$');
        expect(top100.getList().length).toBe(15);
        let idx = Math.floor(Math.random() * top100.getList().length);
        expect(top100.getList()[idx].Price).toBe('$$$');
    });

    test('Filtering further by Cuisine should return sub list', () => {
        top100.addExactFilter('Cuisine', 'Southern');
        expect(top100.getList().length).toBe(3);
    });

    test('getTags should return array of tags for each filter', () => {
        expect(top100.getTags().join(',')).toBe('$$$,Southern');
    })

    test('_findDuplicates should return true if it sees the same "name" prop twice', () => {
        const isDuplicate = top100._findDuplicates();
        expect(isDuplicate('Duck')).toBe(false);
        expect(isDuplicate('Duck')).toBe(true);
        expect(isDuplicate('Goose')).toBe(false);
    });

    test('removeExactFilter should remove the specified filter and tag', () => {
        top100.removeExactFilter('Price');
        expect(top100.getList().length).toBe(6);
        expect(top100.getTags().join(',')).toBe('Southern');
    });

    test('Filtering further by Neighborhood and then removing Cusine should return sub lists', () => {
        top100.addExactFilter('Neighborhood', 'North Side');
        expect(top100.getList().length).toBe(3);
        top100.removeExactFilter('Cuisine');
        expect(top100.getList().length).toBe(34);
    });

    test('removeAllFilters will reset the list to its full 100', () => {
        expect(top100.removeAllFilters().length).toBe(100);
    });

    test('addLazyFilter maintains a dyamic, adjustable lazy search filter', () => {
        let expected = [
            "Barbaro",
            "The Bar at Bohanan’s",
            "SoHo Wine & Martini Bar",
            "Black Board Bar B Q",
            "Godai Sushi Bar & Japanese Restaurant",
            "Meadow Neighborhood Eatery + Bar",
            "Silo Terrace Oyster Bar",
            "Toro Kitchen + Bar"
        ];
        expect(top100.addLazyFilter('Name', 'Bar').map(row => row.Name)).toEqual(expected);
        top100.addExactFilter('Price', '$$')
        expect(top100.getList().length).toBe(3);
        expected = [
            "Meadow Neighborhood Eatery + Bar",
        ];
        top100.addLazyFilter('Name', 'Bar ho');
        expect(top100.getList().map(row => row.Name)).toEqual(expected);
        top100.addLazyFilter('Name', '   ');
        expect(top100.getList().length).toBe(19);
    });
});