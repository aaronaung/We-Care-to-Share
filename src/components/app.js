import React from 'react';
import Selector from '../containers/selector';
import FactList from '../containers/fact_list';
import TakeAction from '../containers/take_action';
import scrollToElement from 'scroll-to-element';
import Info from './info_modal';
import '../css/main.css';

class App extends React.Component{
    scrollTop(event){
        event.preventDefault();
        var scrollTo = document.getElementById("factsContainer");
        scrollToElement(scrollTo, {
            offset: 0,
            duration: 1300
        });
        return;
    }

    render(){
        return (
            <div style={{height: '100%'}}>
                {/* <Info/> */}
                
                <div id="background"></div>
                
                
                <div id="factsContainer" className="container section-container">
                    <h1 className="title text-center pt-5">Learn something about the world</h1>
                    <div className="row mt-4">
                        <Selector/>
                    </div>
                    <div className="row mt-2">
                        <div className="p-0 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <FactList />
                        </div>
                    </div>
                </div>

                
                <a href=""><i onClick={this.scrollTop} id="scrollTop" className="fa fa-arrow-circle-o-up fa-3x"></i></a>
                <TakeAction/>
                <Info />
            </div>
        )
    }
}

export default App;