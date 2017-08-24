import React from 'react';

class CharityCard extends React.Component{

    render(){
        var fundingPercentile = (this.props.funding*100)/this.props.goal
        var fundingBg = 'bg-success';
        switch(true){
            case fundingPercentile < 30:
                fundingBg = 'bg-danger';
                break;
            case fundingPercentile < 70 && fundingPercentile > 30:
                fundingBg = 'bg-warning';
                break;
            default:
                fundingBg = 'bg-success';
        }
        return (
            <div hidden={this.props.fetching} className="col-lg-4 col-md-4 col-sm-12 col xs-12">
                <div className="card mt-4">
                    <div className="image">
                        <img src={this.props.imgUrl} alt="Not Provided" className="card-img-top"/>
                    </div>
                    <div className="card-description card-block">
                        <h4 className="card-title">{this.props.charityName}</h4>
                        <p className="card-text">{this.props.description}</p>
                    </div>
                    <div className="card-goal card-block">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <h6 className= "progress-label">Goal</h6> 
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                <div className="progress">
                                    <div className="progress-bar w-100" role="progressbar" aria-valuenow={this.props.goal} aria-valuemin="0" aria-valuemax={this.props.goal}>
                                        ${this.props.goal}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <h6 className= "progress-label">Funding</h6> 
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                <div className="progress">
                                    <div className={`progress-bar ${fundingBg}`} style={{width: `${fundingPercentile}%`}} role="progressbar" aria-valuenow={this.props.goal} aria-valuemin="0" aria-valuemax={this.props.goal}>
                                        ${this.props.funding}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        {this.props.webUrl === "" ? "": <a target="_blank" href={this.props.webUrl} className="card-link">Visit Website</a>}
                        {this.props.donationUrl === "" ? "" : <a target="_blank" href={this.props.donationUrl} className="card-link">Donate Now!</a>}
                    </div>
                </div>
            </div>
        )
    }
}

export default CharityCard;