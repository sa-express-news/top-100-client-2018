import React, { Component} from 'react';
import { hot } from 'react-hot-loader';

// models
import models from '../../models';

// components
import NavBar from '../NavBar/NavBar';
import Intro from '../Intro/Intro';

// styles
import './App.scss';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            meta: models.getMeta(),
        }
    }

    render() {
        const { meta } = this.state;
        return(
            <div className="App">
                <NavBar checkout={meta.checkout} url={meta.url}></NavBar>
                <div className="container">
                    <Intro meta={meta} />
                </div>
            </div>
        );
    }
}

export default hot(module)(App);
