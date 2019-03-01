class Top100 {
    constructor() {
        this._list = this._refreshList();
        this._filters = new Map();
        this._filterMap = {
            Price: this._exactFilter,
            Cuisine: this._exactFilter,
            Neighborhood: this._exactFilter,
            Name: this._lazyFilter,
        }
    }

    _refreshList() {
        return require('../data/list.json');
    }

    _findDuplicates() {
        const filter = new Set();
        return name => {
            if (filter.has(name)) return true;
            else {
                filter.add(name);
                return false;
            }
        };
    }

    _exactFilter(key, filter, list) {
        const isDuplicate = this._findDuplicates();
        return list.slice().filter(row => {
            return !isDuplicate(row.Name) && row[key] === filter;
        });
    }

    _lazyFilter(key, filter, list) {
        // handle this in another model
    }

    getList() {
        let map = new Set();
        this._list.forEach(row => {
            if (map.has(row.Name)) console.log(row.Name);
            else map.add(row.Name);
        });

        return this._list;
    }

    addFilter(type, filter) {
        if (!this._filters.has(type)) {
            this._filters.set(type, filter);
            return this._list = this._filterMap[type](type, filter, this._list);
        } else {
            return console.error('This filter type already exists!!!');
        }        
    }

    removeFilter(removedType) {
        let list = this._refreshList();
        this._filters.delete(removedType);
        this._filters.forEach((filter, type) => {
            list = this._filterMap[type](type, filter, list);
        });
        return this._list = list;
    }

    removeAllFilters() {
        return this._list = this._refreshList();
    }
}

export default Top100;
