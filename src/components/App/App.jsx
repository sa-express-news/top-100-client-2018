import React, { Component} from 'react';
import { hot } from 'react-hot-loader';

// models
import models from '../../models';

// components
import NavBar from '../NavBar/NavBar';
import Intro from '../Intro/Intro';
import List from '../List/List';

// styles
import './App.scss';

class App extends Component{
    constructor(props) {
        super(props);
        this.top100 = models.getTop100();
        this.state = {
            meta: models.getMeta(),
            list: this.top100.getList(),
            tags: this.top100.getTags(),
            listIsFiltered: this.top100.getList().length < 100,
        };
    }

    setTop100State() {
        this.setState({ 
            list: this.top100.getList(),
            tags: this.top100.getTags(),
            listIsFiltered: this.top100.getList().length < 100,
        });
    }

    addSearchFilter(key, str) {
        this.top100.addLazyFilter(key, str);
        this.setTop100State();
    }

    addDropDownFilter(key, str) {
        this.top100.addExactFilter(key, str);
        this.setTop100State();
    }

    removeDropDownFilter(key) {
        this.top100.removeExactFilter(key);
        this.setTop100State();
    }

    removeAllFilters() {
        this.top100.removeAllFilters();
        this.setTop100State();
    }

    render() {
        const { meta, list, listIsFiltered } = this.state;
        let venues;

        if (listIsFiltered) {
            venues = <List list={list} isFiltered={listIsFiltered} />
        } else {
            venues = <List list={list} isFiltered={listIsFiltered} />
        }

        return(
            <div className="App">
                <NavBar checkout={meta.checkout} url={meta.url}></NavBar>
                <div className="container">
                    <Intro meta={meta} />
                    {venues}
                </div>
            </div>
        );
    }
}

export default hot(module)(App);
