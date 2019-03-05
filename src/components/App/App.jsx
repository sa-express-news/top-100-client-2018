import React, { Component} from 'react';
import { hot } from 'react-hot-loader';

// models
import models from '../../models';

// components
import NavBar           from '../NavBar/NavBar';
import Intro            from '../Intro/Intro';
import Controls         from '../Controls/Controls';
import About            from '../About/About';
import VenueDetails     from '../VenueDetails/VenueDetails'
import OrderedList      from '../OrderedList/OrderedList';
import UnorderedList    from '../UnorderedList/UnorderedList';

// styles
import './App.scss';

class App extends Component{
    constructor(props) {
        super(props);
        this.top100 = models.getTop100();
        this.state = {
            venueInFocus: null,
            viewAboutPage: false,
            meta: models.getMeta(),
            list: this.top100.getList(),
            tags: this.top100.getTags(),
            dropDownOptions: this.top100.getFilterOptionsHash(),
            listIsFiltered: this.top100.getList().length < 100,
        };

        this.addSearchFilter        = this.addSearchFilter.bind(this);
        this.addDropDownFilter      = this.addDropDownFilter.bind(this);
        this.removeDropDownFilter   = this.removeDropDownFilter.bind(this);
        this.removeAllFilters       = this.removeAllFilters.bind(this);
        this.toggleAboutPage        = this.toggleAboutPage.bind(this);
        this.setVenueInFocus        = this.setVenueInFocus.bind(this);
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

    getVenueById() {
        const { list, venueInFocus } = this.state;
        return list.find(row => row.id === venueInFocus)
    }

    setVenueInFocus(venueInFocus) {
        this.setState({ venueInFocus });
    }

    render() {
        const { 
            meta,
            list,
            tags,
            listIsFiltered,
            dropDownOptions,
            viewAboutPage,
            venueInFocus
        } = this.state;
        let main;

        if (viewAboutPage) {
            main = <About toggleAboutPage={this.toggleAboutPage} />
        } else if (venueInFocus) {
            main = <VenueDetails setVenueInFocus={this.setVenueInFocus} {...this.getVenueById()} />
        } else if (listIsFiltered) {
            main = <UnorderedList
                list={list}
                isFiltered={listIsFiltered}
                tags={tags}
                setVenueInFocus={this.setVenueInFocus}
            />
        } else {
            main = <OrderedList
                list={list}
                isFiltered={listIsFiltered}
                setVenueInFocus={this.setVenueInFocus}
            />
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
