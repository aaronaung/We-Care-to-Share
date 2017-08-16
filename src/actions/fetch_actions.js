import Axios from 'axios'; 

const DOSOMETHING_API = "https://www.dosomething.org/api/v1/";

const JUSTGIVING_KEY = "cc562af4";
const JUSTGIVING_API = `https://api.justgiving.com/${JUSTGIVING_KEY}/v1`;

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

    FETCHING_CHARITIES: "FETCHING_CHARITIES"
}

const fetchSuccess = (payload, fetchType)=>{
     return {
         type: fetchType,
         payload
     }
}

const fetchError = (fetchType) => {
    return{
        type: fetchType,
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
            .then( (response) => dispatch(fetchSuccess(response.data, actionTypes.FETCH_CATE_SUCCESS)))
            .catch( (error) => {
                console.log(error);
                dispatch(fetchError(actionTypes.FETCH_CATE_ERROR));
                throw error;
            });
    }
 }

export const fetchFacts = (categoryID) => {
    return (dispatch) => {
        Axios.get(`${DOSOMETHING_API}campaigns?term_ids=${categoryID}&random=true&count=4&cache=false`)
            .then( (response) => dispatch(fetchSuccess(response.data, actionTypes.FETCH_FACTS_SUCCESS)))
            .catch( (error) => {
                console.log("FETCH FACTS ERROR: ", error);
                dispatch(fetchError(actionTypes.FETCH_FACTS_ERROR));
                throw error;
            });
    }
}

export const fetchCharityCategories = () => {
    return (dispatch) => {
        Axios.get(`${JUSTGIVING_API}/charity/categories?format=json`)
            .then( (response)=>dispatch(fetchSuccess(response.data, actionTypes.FETCH_CHARITY_CATE_SUCCESS)))
            .catch( (error) => {
                console.log("FETCH SEARCH CATEGORIES ERROR: ", error)
                dispatch(fetchError(actionTypes.FETCH_CHARITY_CATE_ERRORS))
                throw error;
            });
    }
}

export const fetchCharities = (categoryId , name) => {
    return (dispatch) => {
        dispatch(updateFetchStatus(actionTypes.FETCHING_CHARITIES, true));
        Axios.get(`${JUSTGIVING_API}/charity/search?format=json&categoryid=${categoryId}&q=${name}`)
            .then( (response) => {
                //get more info about each charity by querying by id. 
                var charityAjaxes = response.data.charitySearchResults.map( (charity) => {
                    return Axios(`${JUSTGIVING_API}/charity/${charity.charityId}?format=json&pageSize=5`);
                })

                Axios.all(charityAjaxes).then((results)=> {
                    let charities = results.map( result => result.data);
                    dispatch(fetchSuccess(charities, actionTypes.FETCH_CHARITIES_SUCCESS));
                    dispatch(updateFetchStatus(actionTypes.FETCHING_CHARITIES, false));
                })
            } )
            .catch( (errors) => {
                dispatch(fetchError(actionTypes.FETCH_CHARITIES_ERROR))
                throw errors; 
            })
    }
}
