import {combineReducers} from 'redux';
import * as fetchReducers from "./fetch_reducers";

const rootReducer = combineReducers(
    {
        categories: fetchReducers.fetchCategories,
        facts: fetchReducers.fetchFacts,
        charityCategories: fetchReducers.fetchCharityCategories,
        charities: fetchReducers.fetchCharities,
        fetchStatus: fetchReducers.getFetchStatus
    }
)

export default rootReducer;