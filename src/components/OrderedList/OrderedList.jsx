import React from 'react';
import PropType from 'prop-types';

// components
import List from '../List/List';

// styles
import './OrderedList.scss';

const getCategoryKey = category => {
    return category.toLowerCase().replace(/\s([a-z])/g, g => g[1].toUpperCase());
};

const alphabetize = arr => arr.sort((a, b) => {
    const aName = a.Name.replace(/^The\s/, '');
    const bName = b.Name.replace(/^The\s/, '');

    if (a.Ranking === 'Best') {
        return -1;
    } else if (b.Ranking === 'Best') {
        return 1;
    }

    if (aName < bName) {
        return -1;
    } else if (aName > bName) {
        return 1;
    } else {
        return 0;
    }
});

const sortList = list => list.reduce((hash, row) => {
    const key = getCategoryKey(row.Category);
    if (key === 'restaurant') {
        if (typeof row.Ranking === 'number') {
            hash.top10.rows[row.Ranking - 1] = row;
        } else {
            hash.restaurant.rows.push(row);
            if (hash.restaurant.rows.length === 50) {
                alphabetize(hash.restaurant.rows)
            }
        }
    } else {
        hash[key].rows.push(row);
        if (hash[key].rows.length === hash[key].len) {
            alphabetize(hash[key].rows)
        }
    }
    return hash;
}, {
    bakery: { rows: [], len: 5 },
    bar: { rows: [], len: 10 },
    brewery: { rows: [], len: 5 },
    coffeeShop: { rows: [], len: 5 },
    distillery: { rows: [], len: 5 },
    restaurant: { rows: [], len: 50 },
    top10: { rows: [], len: 10 },
    winery: { rows: [], len: 10 },
});

const buildOrderedList = ({ list, isFiltered, setVenueInFocus }) => {
    const sortedList = sortList(list);
    return [{
        className: 'top-10',
        title: 'Top 10',
        key: 'top10',
    }, {
        className: 'restaurants',
        title: '50 Other Top Restaurants',
        key: 'restaurant', 
    }, {
        className: 'bars',
        title: 'Top 10 Bars',
        key: 'bar', 
    }, {
        className: 'bakeries',
        title: 'Top 5 Bakeries',
        key: 'bakery', 
    }, {
        className: 'breweries',
        title: 'Top 5 Breweries',
        key: 'brewery', 
    }, {
        className: 'coffee-shos',
        title: 'Top 5 Coffee Shops',
        key: 'coffeeShop', 
    }, {
        className: 'distilleries',
        title: 'Top 5 Distilleries',
        key: 'distillery', 
    }, {
        className: 'wineries',
        title: 'Top 10 Hill Country Wineries',
        key: 'winery', 
    }].map(({ className, title, key }) => (
        <div key={key} className={className}>
            <div className="header">
                <p className="title">{title}</p>
                <hr />
            </div>
            <List
                list={sortedList[key].rows}
                isFiltered={isFiltered}
                setVenueInFocus={setVenueInFocus}
            />
        </div>
    ));
};

const OrderedList = props => (
    <div className="ordered-list">
        {buildOrderedList(props)}
    </div>
)

OrderedList.propTypes = {
    list: PropType.arrayOf(PropType.exact({
        id: PropType.number.isRequired,
        Category: PropType.string.isRequired,
        Ranking: PropType.oneOfType([
            PropType.string,
            PropType.number
        ]),
        Name: PropType.string.isRequired,
        Photo: PropType.string.isRequired,
        Address: PropType.string.isRequired,
        Phone: PropType.string.isRequired,
        Cuisine: PropType.string.isRequired,
        Description: PropType.string,
        Neighborhood: PropType.string.isRequired,
        Price: PropType.string.isRequired,
        Website: PropType.string,
        Link: PropType.string.isRequired,
        Review: PropType.string,
    }).isRequired).isRequired,
    isFiltered: PropType.bool.isRequired,
    setVenueInFocus: PropType.func.isRequired,
};

export default OrderedList
