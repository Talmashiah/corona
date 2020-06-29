import React, { Component } from 'react'

import { connect } from 'react-redux';
import { loadSearchData, updateFilterBy, updateSortBy } from '../actions/searchActions';

import ProductList from '../cmps/product/ProductList.jsx';
import FilterList from '../cmps/filter/FilterList.jsx';
import SearchHeader from '../cmps/search/SearchHeader';

class SearchPage extends Component {

    state = { isFiltersShown: false };

    componentDidMount() {
        this.loadSearchData();
    }

    loadSearchData = () => {
        const { term, _id } = this.props.match.params;
        const { filterBy, updateFilterBy, loadSearchData } = this.props;
        if (term) {
            filterBy.searchValue = term;
            filterBy.categoryId = null;
        }
        if (_id) {
            filterBy.categoryId = _id;
            filterBy.searchValue = null;
        }
        updateFilterBy(filterBy);
        loadSearchData(filterBy);
    }


    componentDidUpdate(prevProps) {
        const { term, _id } = this.props.match.params;
        const { filterBy } = this.props;
        if (term) {
            if (prevProps.match.params.term !== this.props.match.params.term) {
                filterBy.filters = [];
                filterBy.priceFilter = { max: null, min: null };
                this.loadSearchData();
            }
            if (prevProps.filterBy !== filterBy) {
                this.loadSearchData();
            }
        }
        if (_id) {
            const isIdMatch = prevProps.match.params._id !== this.props.match.params._id;
            if (prevProps.filterBy !== this.props.filterBy || isIdMatch) {
                this.loadSearchData();
            }
            if (isIdMatch) {
                filterBy.priceFilter = { max: null, min: null };
                filterBy.filters = [];
                this.props.updateFilterBy(filterBy);
            }
        }
    }

    updatePrice = (updatedPrice) => {
        let filterBy = { ...this.props.filterBy };
        filterBy.priceFilter = updatedPrice;
        this.props.updateFilterBy(filterBy);
    }

    updateFilters = (filter) => {
        let filterBy = { ...this.props.filterBy };
        const isFound = filterBy.filters.some(currFilter => currFilter.name === filter.name);
        if (isFound) {
            filterBy.filters = filterBy.filters.filter(currFilter => currFilter.name !== filter.name);
        } else {
            filterBy.filters.push(filter);
        }
        this.props.updateFilterBy(filterBy);
    }

    updateSort = (option) => {
        this.props.updateSortBy(option.key);
    }

    toggleFilters = () => {
        this.setState(prevState => ({
            isFiltersShown: !prevState.isFiltersShown
        }))
    }

    render() {
        const { products, filters, priceFilter } = this.props;
        const { isFiltersShown } = this.state;
        const { term, name } = this.props.match.params;
        if (!products) return null;
        return (
            <div className={`search-page flex ${isFiltersShown ? 'menu-open' : ''}`}>
                {/* TODO check if there is a problem */}
                {/* {(products.length < 2 && filterBy.filters.length === 0 && !filterBy.priceFilter.min && !name) || */}
                {products.length ? <FilterList
                    filters={filters}
                    priceFilter={priceFilter}
                    isFiltersShown={isFiltersShown}
                    productsLength={products.length}
                    updatePrice={this.updatePrice}
                    updateFilters={this.updateFilters}
                    toggleFilters={this.toggleFilters}
                /> : null}
                {/* } */}
                <div className="screen" onClick={this.toggleFilters}></div>

                <div className="search-container">
                    <SearchHeader term={term || name} productsLength={products.length} updateSort={this.updateSort} toggleFilters={this.toggleFilters} />
                    <ProductList products={products} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.search.searchData.products,
        filters: state.search.searchData.filters,
        priceFilter: state.search.searchData.priceFilter,
        filterBy: state.search.filterBy
    };
};

const mapDispatchToProps = {
    loadSearchData,
    updateFilterBy,
    updateSortBy
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);