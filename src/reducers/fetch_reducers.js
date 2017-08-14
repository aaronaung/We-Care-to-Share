import { actionTypes } from "../actions/fetch_actions"

export const fetchCategories = (state = [], action)=>{
    switch(action.type){
        case actionTypes.FETCH_CATE_SUCCESS:
            return action.payload;
        //object assign merge all objects to the target [0] and return new
        default:
            return state;
    }
}

export const fetchFacts = (state = [], action) =>{
    switch(action.type){
        case actionTypes.FETCH_FACTS_SUCCESS:
            return action.payload.data;
        //object assign merge all objects to the target [0] and return new
        default:
            return state;
    }
}

export const fetchOrganizations = (state = [], action) => {
    switch(action.type){
        case actionTypes.FETCH_ORGS_SUCCESS:
            return action.payload.data;
        default:
            return state;
    }
}