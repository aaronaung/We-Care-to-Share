import Axios from 'axios'; 

const DOSOMETHING_API = "https://www.dosomething.org/api/v1/"
const ORGHUNTER_API = "http://data.orghunter.com/v1/charitysearch"
const ORGHUNTER_KEY = "bed3d56dc4481d875f8620ffaab43bd4"

export const actionTypes = {
    FETCH_CATE_SUCCESS: "FETCH_CATE_SUCCESS",
    FETCH_FACTS_SUCCESS: "FETCH_FACTS_SUCCESS",
    FETCH_ORGS_SUCCESS: "FETCH_ORGS_SUCCESS"
}

const fetchSuccess = (payload, fetchType)=>{
     return {
         type: fetchType,
         payload
     }
}

export const fetchCategories = () => {
    return (dispatch) => {
         Axios.get(`${DOSOMETHING_API}terms`)
            .then( (response) => dispatch(fetchSuccess(response.data, actionTypes.FETCH_CATE_SUCCESS)))
            .catch( (error) => console.log(error));
    }
 }

export const fetchFacts = (categoryID) => {
    return (dispatch) => {
        Axios.get(`${DOSOMETHING_API}campaigns?term_ids=${categoryID}&random=true&count=4&cache=false`)
            .then( (response) => dispatch(fetchSuccess(response.data, actionTypes.FETCH_FACTS_SUCCESS)))
            .catch( (error) => console.log("FETCH FACTS ERROR: ", error));
    }
}

export const fetchOrganizations = (city, state, zip) => {
    return (dispatch) => {
        Axios.get(`${ORGHUNTER_API}?user_key=${ORGHUNTER_KEY}&city=${city}&state=${state}&zip=${zip}`)
            .then( (response)=>dispatch(fetchSuccess(response.data, actionTypes.FETCH_ORGS_SUCCESS)))
            .catch( (error) => console.log("FETCH ORGS ERROR: ", error));
    }
}

