import React from 'react';
import FactItem from '../components/fact_item';
import {connect} from 'react-redux';
import scrollToElement from 'scroll-to-element';

class FactList extends React.Component {
    scrollToTakeAction(event){
        event.preventDefault();
        var takeActionDiv = document.getElementById("takeAction");
        scrollToElement(takeActionDiv, {
            offset: 0,
            duration: 1500
        });
    }

    render(){
        var nonEmptyFacts = []
        for(var i = 0; i < this.props.facts.length ; i++){
            if(this.props.facts[i].facts.problem !== null){
                nonEmptyFacts.push(this.props.facts[i])
            } 
        }
        var hide = this.props.facts.length === 0;
        return (
            <div>
                <legend className="mt-3" hidden={hide}>Did you know?</legend>
                <hr hidden={hide}/>
                <ul className="list-group mt-3 p-0">
                    {nonEmptyFacts.map( (entry)=> {
                        return <FactItem  fact={entry.facts.problem} />;
                    })}
                </ul>
                <button onClick={this.scrollToTakeAction} hidden={hide} className="btn btn-success btn-lg form-control mt-3">Take Action!</button>
            </div>
        )
    }
} 
    
const mapStateToProps = (state)=>{
    return {
        facts: state.facts
    }
}

export default connect(mapStateToProps)(FactList);