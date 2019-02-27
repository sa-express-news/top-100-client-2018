import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App functionality', () => {
    const app = shallow(<App />);

    test('getSocialLinks should return a socialLinks obj', () => {    
        expect(app.instance().getSocialLinks()).toHaveProperty('twitter');
    });
    
    test('App should include a "meta" prop with a "facebook" string prop', () => {
        expect(typeof app.state().meta.facebook).toBe('string');
    });
});