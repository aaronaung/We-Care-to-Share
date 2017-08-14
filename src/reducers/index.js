import {combineReducers} from 'redux';
import * as fetchReducers from "./fetch_reducers";

const rootReducer = combineReducers(
    {
        categories: fetchReducers.fetchCategories,
        facts: fetchReducers.fetchFacts,
        organizations: fetchReducers.fetchOrganizations
    }
)

export default rootReducer;