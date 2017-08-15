import React from 'react';
import { connect } from 'react-redux';
// import OrgTable from '../components/org_table';
import { fetchCharities } from '../actions/fetch_actions';
import CharityCard from "../components/charity_card"

class TakeAction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            category: ""
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.getCharities = this.getCharities.bind(this);
    }

    onInputChange(event, type){
        var changedObject = {};
        changedObject[type] = event.target.value;
        this.setState(changedObject);
    }

    getCharities(event){
        event.preventDefault();
        this.props.getCharities(this.state.category, this.state.name);
    }

    render() {
        return(
            <div id="takeAction" hidden={0} className="section-container container">
                <h2 className="pt-3 pb-3">Let's Do Something About It!</h2>
                <hr/>
                <form action="" className="form-inline">
                    <input onChange={(e) => this.onInputChange(e,'name')} type="text" className="form-control mr-2" placeholder="Searches by charity name"/>
                    <select onChange={(e) => this.onInputChange(e,'category')} className="form-control mr-2" name="" id="">
                        <option value="">Select charity catagory</option>
                        {this.props.charityCategories.map((category) => {
                            return <option value={category.id}>{category.category}</option>
                        })}
                    </select>
                    <button onClick={this.getCharities} className="btn-md btn-primary btn">Search for charities</button>
                </form>

                <div className="row">
                    <i hidden={this.props.fetchStatus.FETCHING_CHARITIES ? false: true} id="fetchingCharities" className="fa fa-spinner fa-spin"></i>
                    {this.props.charities.map( (charity) => {
                        return <CharityCard 
                            imgUrl={charity.logoAbsoluteUrl}
                            charityName = {charity.name}
                            description = {charity.description}
                            webUrl = {charity.websiteUrl}
                            donationUrl = {charity.profilePageUrl}
                        />
                    })}
                </div>
                
                {/* <OrgTable data={dataSet} /> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        facts : state.facts,
        charityCategories: state.charityCategories,
        charities: state.charities,
        fetchStatus: state.fetchStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCharities: (categoryId, name) => dispatch(fetchCharities(categoryId, name)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TakeAction);