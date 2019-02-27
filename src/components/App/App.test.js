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