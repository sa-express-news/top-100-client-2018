import React, { Component } from 'react';
import PropType from 'prop-types';

// styles
import './Controls.scss';


class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filters: { // used for adding and removing classes
                Cuisine: '',
                Price: '',
                Neighborhood: '',
                Name: '',
            },
        };

        this.searchTimeout  = undefined;
        this.handleSearch   = this.handleSearch.bind(this);
        this.handleSelect   = this.handleSelect.bind(this);
        this.handleReset    = this.handleReset.bind(this);
    }

    cancelSearchFilter() {
        window.clearTimeout(this.searchTimeout);
    }
    
    handleSearch(e) {
        const val = e.target.value;
        const { filters } = this.state;

        this.setState({
            filters: Object.assign({}, filters, {
                Name: val,
            }),
        });

        if (typeof this.searchTimeout === 'number') {
            this.cancelSearchFilter();
        }

        this.searchTimeout = window.setTimeout(() => {
            this.searchTimeout = undefined;
            this.props.addSearchFilter('Name', val);
        }, 500);
    }

    handleSelect(val, type) {
        const { filters } = this.state;
        if (val) {
            this.props.addDropDownFilter(type, val);
        } else {
            this.props.removeDropDownFilter(type);
        }
        this.setState({
            filters: Object.assign({}, filters, {
                [type]: val,
            }),
        });
    }

    handleReset() {
        this.props.removeAllFilters();
        this.setState({
            filters: {
                Cuisine: '',
                Price: '',
                Neighborhood: '',
                Name: '',
            },
        });
    }

    getDropDownOptions(type) {
        return [...this.props.dropDownOptions[type]].map((option, key) => {
            const val = option === type ? '' : option;
            return <option key={key} value={val}>{option}</option>;
        });
    }

    setSelectFilterClassNames(type) {
        const base = 'filter';
        const { filters } = this.state;
        return filters[type] !== '' ? `${base} selected` : base;
    }

    render() {
        const { toggleAboutPage } = this.props;
        const { filters } = this.state;

        return (
            <div className="controls">
                <ul>
                    <li>
                        <button id="about" onClick={toggleAboutPage}>About</button>
                    </li>
                </ul>
                <input
                    type="text"
                    value={filters.Name}
                    id="search"
                    onChange={this.handleSearch}
                    placeholder="Search the Top 100 by name or filter by category below"
                />
                <ul className="filters">
                    <li>
                        <select 
                            value={filters.Cuisine}
                            className={this.setSelectFilterClassNames('Cuisine')}
                            id="cuisine"
                            onChange={e => this.handleSelect(e.target.value, 'Cuisine')}
                        >
                            {this.getDropDownOptions('Cuisine')}
                        </select>
                    </li>
                    <li>
                        <select
                            value={filters.Neighborhood}
                            className={this.setSelectFilterClassNames('Neighborhood')}
                            id="neighborhood"
                            onChange={e => this.handleSelect(e.target.value, 'Neighborhood')}
                        >
                            {this.getDropDownOptions('Neighborhood')}
                        </select>
                    </li>
                </ul>
                <ul className="filters">
                    <li>
                        <select 
                            value={filters.Price}
                            className={this.setSelectFilterClassNames('Price')}
                            id="price"
                            onChange={e => this.handleSelect(e.target.value, 'Price')}
                        >
                            {this.getDropDownOptions('Price')}
                        </select>
                    </li>
                    <li>
                        <button id="reset" onClick={this.handleReset}>Reset search</button>
                    </li>
                </ul>
            </div>
        );
    }
}

Controls.propTypes = {
    addSearchFilter: PropType.func.isRequired,
    addDropDownFilter: PropType.func.isRequired,
    removeDropDownFilter: PropType.func.isRequired,
    removeAllFilters: PropType.func.isRequired,
    toggleAboutPage: PropType.func.isRequired,
    dropDownOptions: PropType.shape({
        Cuisine: PropType.instanceOf(Set).isRequired,
        Neighborhood: PropType.instanceOf(Set).isRequired,
        Price: PropType.instanceOf(Set).isRequired,
    }).isRequired,
};

export default Controls
