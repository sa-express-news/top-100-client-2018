import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('Meta state structure', () => {
    const app = shallow(<App />);
    
    test('App should include a "meta" prop with a "url" string prop', () => {
        expect(typeof app.state().meta.url).toBe('string');
    });

    test('App should include a "meta" prop with a "checkout" string prop', () => {
        expect(typeof app.state().meta.checkout).toBe('string');
    });
});

describe('Methods that modify the Top 100 instance', () => {
    const app = shallow(<App />);

    test('addSearchFilter should filter the list via a lazy string', () => {
        app.instance().addSearchFilter('Name', 'Rest');
        expect(app.state().list.every(row => row.Name.indexOf('Rest') !== -1)).toBe(true);
    });

    test('addDropDownFilter should filter the list via an exact string', () => {
        app.instance().addDropDownFilter('Price', '$$');
        expect(app.state().list.length).toBe(1);
    });

    test('addSearchFilter should remove if blank and calling addDropDownFilter on a second type should further filter via exact string', () => {
        app.instance().addSearchFilter('Name', '');
        app.instance().addDropDownFilter('Cuisine', 'American (New)');
        expect(app.state().list.length).toBe(3);
    });

    test('removeDropDownFilter should remove a single filter and return the remaining tags', () => {
        app.instance().removeDropDownFilter('Price');
        expect(app.state().list.length).toBe(14);
        expect(app.state().tags.join(',')).toBe('American (New)');
    });
})