import React, { Component} from 'react';
import { hot } from 'react-hot-loader';

// models
import models from '../../models';

// components
import NavBar from '../NavBar/NavBar';
import Intro from '../Intro/Intro';
import Controls from '../Controls/Controls';
import About from '../About/About';
import OrderedList from '../OrderedList/OrderedList';
import UnorderedList from '../UnorderedList/UnorderedList';

// styles
import './App.scss';

class App extends Component{
    constructor(props) {
        super(props);
        this.top100 = models.getTop100();
        this.state = {
            viewIdDetails: null,
            viewAboutPage: false,
            meta: models.getMeta(),
            list: this.top100.getList(),
            tags: this.top100.getTags(), // not yet in use
            listIsFiltered: this.top100.getList().length < 100,
            dropDownOptions: this.getDropDownOptions(),
        };

        this.addSearchFilter = this.addSearchFilter.bind(this);
        this.addDropDownFilter = this.addDropDownFilter.bind(this);
        this.removeDropDownFilter = this.removeDropDownFilter.bind(this);
        this.removeAllFilters = this.removeAllFilters.bind(this);
        this.toggleAboutPage = this.toggleAboutPage.bind(this);
    }

    getDropDownOptions() {
        return Object.assign({}, this.top100.getList().reduce((hash, row) => {
            Object.keys(hash).forEach(key => {
                row[key].split(',').forEach(val => {
                    if (!hash[key].has(val.trim())) {
                        hash[key].add(val.trim());
                    }
                });
            });
            return hash;
        }, {
            'Cuisine': new Set(['Cuisine']),
            'Neighborhood': new Set(['Neighborhood']),
        }), {
            'Price': new Set(['Price', '$', '$$', '$$$', '$$$$']),
        });
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

    toggleAboutPage() {
        this.setState(state => ({
            viewAboutPage: !state.viewAboutPage
        }));
    }

    render() {
        const { 
            meta,
            list,
            tags,
            listIsFiltered,
            dropDownOptions,
            viewAboutPage,
            viewIdDetails
        } = this.state;
        let main;

        if (viewAboutPage) {
            main = <About toggleAboutPage={this.toggleAboutPage} />
        } else if (listIsFiltered) {
            main = <UnorderedList list={list} isFiltered={listIsFiltered} tags={tags} />
        } else {
            main = <OrderedList list={list} isFiltered={listIsFiltered} />
        }

        return(
            <div className="App">
                <NavBar checkout={meta.checkout} url={meta.url}></NavBar>
                <div className="container">
                    <Intro meta={meta} />
                    <Controls
                        dropDownOptions={dropDownOptions}
                        viewAboutPage={viewAboutPage}
                        addSearchFilter={this.addSearchFilter}
                        addDropDownFilter={this.addDropDownFilter}
                        removeDropDownFilter={this.removeDropDownFilter}
                        removeAllFilters={this.removeAllFilters}
                        toggleAboutPage={this.toggleAboutPage}
                    />
                    {main}
                </div>
            </div>
        );
    }
}

export default hot(module)(App);
