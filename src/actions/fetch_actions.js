import Axios from 'axios'; 

const DOSOMETHING_API = "https://www.dosomething.org/api/v1/";

const GLOBALGIVING_KEY = "91c13488-b7d8-4b17-b8e8-60cb613b88e2";
const GLOBALGIVING_API = `https://api.globalgiving.org/api/public`;

export const actionTypes = {
    //FETCH SUCECSS ACTION TYPES
    FETCH_CATE_SUCCESS: "FETCH_CATE_SUCCESS",
    FETCH_FACTS_SUCCESS: "FETCH_FACTS_SUCCESS",
    FETCH_CHARITY_CATE_SUCCESS: "FETCH_CHARITY_CATE_SUCCESS",
    FETCH_CHARITIES_SUCCESS: "FETCH_CHARITIES_SUCCESS",

    //FETCH ERROR ACTION TYPES
    FETCH_CATE_ERROR: "FETCH_CATE_ERROR",
    FETCH_FACTS_ERROR: "FETCH_FACTS_ERROR",
    FETCH_CHARITY_CATE_ERRORS: "FETCH_CHARITY_CATE_ERROR",
    FETCH_CHARITIES_ERROR: "FETCH_CHARITIES_ERROR",

    FETCHING_CHARITIES: "FETCHING_CHARITIES",
    EMPTY_CHARITIES: "EMPTY_CHARITIES"
}

const dispatchAction = (fetchType, payload)=>{
     return {
         type: fetchType,
         payload
     }
}

const updateFetchStatus =(statusType, fetching)=>{
    var status = {};
    status[statusType] = fetching;
    return {
        type: statusType,
        payload: status
    }
}

export const fetchCategories = () => {
    return (dispatch) => {
         Axios.get(`${DOSOMETHING_API}terms`)
            .then( (response) => dispatch(dispatchAction(actionTypes.FETCH_CATE_SUCCESS, response.data)))
            .catch( (error) => {
                console.log(error);
                //dispatch(updateFetchStatus(actionTypes.FETCH_CATE_ERROR));
                throw error;
            });
    }
 }

export const fetchFacts = (categoryID) => {
    return (dispatch) => {
        Axios.get(`${DOSOMETHING_API}campaigns?term_ids=${categoryID}&random=true&count=4&cache=false`)
            .then( (response) => dispatch(dispatchAction(actionTypes.FETCH_FACTS_SUCCESS,response.data)))
            .catch( (error) => {
                console.log("FETCH FACTS ERROR: ", error);
                //dispatch(updateFetchStatus(actionTypes.FETCH_FACTS_ERROR));
                throw error;
            });
    }
}

export const fetchCharityCategories = () => {
    return (dispatch) => {
        Axios.get(`${GLOBALGIVING_API}/projectservice/themes?api_key=${GLOBALGIVING_KEY}`)
            .then( (response)=>dispatch(dispatchAction(actionTypes.FETCH_CHARITY_CATE_SUCCESS, response.data.themes.theme)))
            .catch( (error) => {
                console.log("FETCH SEARCH CATEGORIES ERROR: ", error)
                //dispatch(updateFetchStatus(actionTypes.FETCH_CHARITY_CATE_ERRORS))
                throw error;
            });
    }
}

export const fetchCharities = (categoryId , country) => {
    var category = categoryId === "" ? "" : `theme:${categoryId}`
    var countryCode = country === "" ? "" : `country:${country}`
    var query = `filter=${category},${countryCode}&q=*`
    return (dispatch) => {
        dispatch(updateFetchStatus(actionTypes.FETCHING_CHARITIES, true));
        Axios.get(`${GLOBALGIVING_API}/services/search/projects?api_key=${GLOBALGIVING_KEY}&${query}`)
            .then( (response) => {
                var data = response.data.search.response.numberFound === 0 ? [] : response.data.search.response.projects.project;
                dispatch(dispatchAction(actionTypes.FETCH_CHARITIES_SUCCESS, data));
                dispatch(updateFetchStatus(actionTypes.FETCHING_CHARITIES, false));
                data.length === 0 ? dispatch(dispatchAction(actionTypes.EMPTY_CHARITIES,true)): dispatch(dispatchAction(actionTypes.EMPTY_CHARITIES,false));
            } )
            .catch( (errors) => {
                dispatch(updateFetchStatus(actionTypes.FETCHING_CHARITIES, false));
                dispatch(dispatchAction(actionTypes.FETCH_CHARITIES_ERROR, []));
                dispatch(dispatchAction(actionTypes.EMPTY_CHARITIES, true));
                throw errors.response; 
            })
    }
}
