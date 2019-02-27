import React, { Component} from 'react';
import { hot } from 'react-hot-loader';

// models
import models from '../../models';

// components
import NavBar from '../NavBar/NavBar';

// styles
import './App.scss';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            meta: models.getMeta(),
        }
    }

    getSocialLinks() {
        const { meta } = this.state;
        return {
            facebook: meta.facebook,
            twitter: meta.twitter,
            reddit: meta.reddit,
        }
    }

    render(){
        return(
            <div className="App">
                <NavBar socialLinks={this.getSocialLinks()} />
            </div>
        );
    }
}

export default hot(module)(App);
