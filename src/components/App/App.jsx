import React, { Component} from 'react';
import { hot } from 'react-hot-loader';

// models
import models from '../../models';

// components
import NavBar from '../NavBar/NavBar';
import ENLogo from '../ENLogo/ENLogo';

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
        return(
            <div className="App">
                <NavBar>
                    <div className="left">
						<ENLogo />
					</div>
					<div className="right">
						{/* <SocialBlock url={meta.url} /> */}
					</div>
                </NavBar>
            </div>
        );
    }
}

export default hot(module)(App);
