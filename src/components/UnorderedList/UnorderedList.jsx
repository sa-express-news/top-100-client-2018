import React from 'react';
import PropType from 'prop-types';

// components
import List from '../List/List';

// styles
import './UnorderedList.scss';

const printTags = tags => tags.reduce((res, tag, idx, src) => {
    if (idx === 0) {
        return res += tag;
    } else if (idx + 1 === src.length) {
        return res += ` and ${tag}`;
    } else {
        return res += `, ${tag}`
    }
}, '');

const UnorderedList = ({ list, isFiltered, tags, setVenueInFocus }) => {
    let results;
    if (list.length) {
        results = <List list={list} isFiltered={isFiltered} setVenueInFocus={setVenueInFocus} />
    } else {
        results = <div className="empty">Your search returned no results</div>
    }

    return (
        <div className="unordered-list">
            <div className="search-results">
                <div className="header">
                    <p className="title">{`Filtering by: ${printTags(tags)}`}</p>
                    <hr />
                </div>
                {results}
            </div>
        </div>
    )
};

UnorderedList.propTypes = {
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
        Review: PropType.string,
    }).isRequired).isRequired,
    tags: PropType.arrayOf(PropType.string).isRequired,
    isFiltered: PropType.bool.isRequired,
    setVenueInFocus: PropType.func.isRequired,
};

export default UnorderedList
