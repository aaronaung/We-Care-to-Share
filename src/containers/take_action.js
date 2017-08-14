import React from 'react';
import { connect } from 'react-redux';
import OrgTable from '../components/org_table';
import { fetchOrganizations } from '../actions/fetch_actions';

class TakeAction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            city: "",
            zip: "",
            state: "",
        }
        this.getOrganizations = this.getOrganizations.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event, type){
        var changedObject = {};
        changedObject[type] = event.target.value;
        this.setState(changedObject);
    }

    getOrganizations(event){
        event.preventDefault();
        this.props.fetchOrganizations(this.state.city, this.state.state, this.state.zip)
    }
    
    constructTableData(){
        var organizations = this.props.organizations;
        //var dataSet = [];
        var dataSet = organizations.map( (org) => {
            var data = {};
            data['category'] = org.category;
            data["name"] = <i>{org.charityName}</i>;
            data["web"] = <a href={org.url}>Link to Website</a>;
            data["donation"] =<a href={org.donationUrl}>Donate Here</a>;
            data["tax"] = org.deductibilityCd === 1 ? <b>Yes</b> : <b>No</b>;
            //dataSet.push(data);
            return data;
        })
        return dataSet;
    }

    render() {
        var hide = this.props.facts.length === 0;
        var dataSet = this.constructTableData();
        var stateArray = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",  
            "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",  
            "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",  
            "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",  
            "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];
        return(
            <div id="takeAction" hidden={hide} className="section-container container">
                <h1 className="pt-5 pb-3">Do Something About It!</h1>
                <hr/>
                <form action="" className="form-inline">
                    <input onChange={(e) => this.onInputChange(e,'city')} type="text" className="form-control mr-2" placeholder="City"/>
                    <input onChange={(e) => this.onInputChange(e,'zip')} type="text" className="form-control mr-2" placeholder="Zip Code"/>
                    <select onChange={(e) => this.onInputChange(e,'state')} className="form-control mr-2" name="" id="">
                        <option value="">State</option>
                        {stateArray.map((state) => {
                            return <option value={state}>{state}</option>
                        })}
                    </select>
                    <button onClick={this.getOrganizations} className="btn-md btn-primary btn">Search for Organizations</button>
                </form>

                <OrgTable data={dataSet} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        facts : state.facts,
        organizations: state.organizations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {fetchOrganizations: (city, state, zip ) =>  dispatch(fetchOrganizations(city, state, zip))}
}

export default connect(mapStateToProps, mapDispatchToProps)(TakeAction);