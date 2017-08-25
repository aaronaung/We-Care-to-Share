import React from 'react';
import {connect} from 'react-redux';
import * as fetchActions from "../actions/fetch_actions";
import Axios from 'axios';


class Selector extends React.Component{
    constructor(props){
        super(props);
        this.state = {selected: ""}; //stores term/category ID 
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillMount(){
        Axios.get('https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=91c13488-b7d8-4b17-b8e8-60cb613b88e2').then( (response) => console.log(response))
        this.props.fetchCategories();
        this.props.fetchCharityCategories();
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.setState({selected: ""})
        this.props.fetchFacts(this.state.selected);
    }

    constructOptions(){
        var defaultOption = <option key={-1} value="">Please select a category</option>
        var categories = [defaultOption];
        if(this.props.categories.length !== 0){
            this.props.categories.map( (category) => categories.push(
                <option key={category.tid} value= {category.tid}>{category.name}</option> 
            ))
        } 
        return categories;
    }

    render(){
        let cateOptions = this.constructOptions();
        return(
            <form onSubmit={this.onFormSubmit} className="input-group" action="">
                <select value={this.state.selected} onChange= {(event) => this.setState({selected: event.target.value})} name="" id="" className="form-control">
                    {cateOptions}
                </select>
                <span className="input-group-btn">
                    <button disabled={this.state.selected===""} className="btn btn-primary">Generate Facts</button>
                </span>
            </form>
        ) 
    }
}

const mapStateToProps = (state)=>{
    return{
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        fetchCategories : () => dispatch(fetchActions.fetchCategories()), 
        //dispatch the (dispatch) function *object* returned by the action creator
        //Thunk allows you to dispatch function obj     ects.
        fetchFacts: (categoryID) => dispatch(fetchActions.fetchFacts(categoryID)), 
        fetchCharityCategories : () => dispatch(fetchActions.fetchCharityCategories())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Selector);