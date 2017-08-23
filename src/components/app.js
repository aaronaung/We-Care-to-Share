import React from 'react';
import Selector from '../containers/selector';
import FactList from '../containers/fact_list';
import TakeAction from '../containers/take_action'

const App = ()=>{
    return (
        <div style={{height: '100%'}}>
            <div id="factsContainer" className="container section-container">
                <h1 className="title text-center pt-4">Learn something about the world</h1>
                <div className="row mt-4">
                    <Selector/>
                </div>
                <div className="row mt-2">
                    <div className="p-0 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <FactList />
                    </div>
                </div>
            </div>
            <TakeAction/>
        </div>
        
        
    )
}

export default App;