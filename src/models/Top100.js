/**
 * @class
 * @classdesc Loads, maintains and modifies Top 100 list state
 * 
 * @method
 * @name getList - Returns the current list of venues
 * 
 * @method
 * @name getTags - Returns an array of strings representing all the currently applied filters
 * 
 * @method
 * @name addLazyFilter - Filter the list by a string if found in the specified column
 * @param type {string} - Name of the column to apply the filter to (eg: 'Name')
 * @param filter {string} - The string to filter against
 * 
 * @method
 * @name addExactFilter - Filter the list by a string if exactly matches the specified column
 * @param type {string} - Name of the column to apply the filter to (eg: 'Name')
 * @param filter {string} - The string to filter against
 * 
 * @method
 * @name removeLazyFilter - Remove a previously applied exact filter and tag
 * @param type {string} - Name of the filter to remove
 * 
 * @method
 * @name removeAllFilters - Remove all filters and get fresh list of Top 100
 * 
 */

class Top100 {
    constructor() {
        this._list = this._refreshList();
        this._tags = new Map();
    }

    _refreshList() {
        return require('../data/list.json');
    }

    _findDuplicates() { // Keep track of if a restaurant/bar/etc has already been seen in the list to filter out dups
        const found = new Set();
        return name => {
            if (found.has(name)) return true;
            else {
                found.add(name);
                return false;
            }
        };
    }

    _filterExactlyMatchesVal(vals, filter) { // since vals can be comma separated (eg: 'Southern, Italian') split on comma then look for matches
        return !!vals.split(',').find(val => val.trim() === filter);
    }

    _exactFilter(key, filter, list) {
        const isDuplicate = this._findDuplicates();
        return list.slice().filter(row => !isDuplicate(row.Name) && this._filterExactlyMatchesVal(row[key], filter));
    }

    _lazyFilterIsInVal(val, filter) {
        return val.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }

    _allLazyFiltersAreInVal(val, filters) {
        return !!filters.split(/\s+/).every(filter => this._lazyFilterIsInVal(val, filter));
    }

    _lazyFilter(key, filters, list) {
        const isDuplicate = this._findDuplicates();
        const prunedFilters = filters.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); // removes all punctionation
        return list.slice().filter(row => !isDuplicate(row.Name) && this._allLazyFiltersAreInVal(row[key], prunedFilters)); // if all words in filter exists in string, it's a match
    }

    getList() {
        return this._list;
    }

    getTags() {
        return Array.from(this._tags.values());
    }

    addLazyFilter(type, filters) {
        let list = this._refreshList();
        this._tags.forEach((filter, type) => {
            list = this._exactFilter(type, filter, list);
        });
        return this._list = this._lazyFilter(type, filters, list)
    } 

    addExactFilter(type, filter) {
        if (this._tags.has(type)) {
            this.removeExactFilter(type);
        }
        this._tags.set(type, filter);
        return this._list = this._exactFilter(type, filter, this._list);       
    }

    removeExactFilter(removedType) {
        let list = this._refreshList();
        this._tags.delete(removedType);
        this._tags.forEach((filter, type) => {
            list = this._exactFilter(type, filter, list);
        });
        return this._list = list;
    }

    removeAllFilters() {
        this._tags = new Map();
        return this._list = this._refreshList();
    }
}

export default Top100;
