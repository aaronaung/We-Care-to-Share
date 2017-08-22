import React from 'react';

class CharityCard extends React.Component{

    render(){
        return (
            <div hidden={this.props.fetching} className="col-lg-4 col-md-4 col-sm-6 col xs-12">
                <div className="card mt-4">
                    <div className="image">
                        <img src={this.props.imgUrl} alt="Not Provided" className="card-img-top"/>
                    </div>
                    <div className="card-block">
                        <h4 className="card-title">{this.props.charityName}</h4>
                        <p className="card-text">{this.props.description}</p>
                    </div>
                    <div className="card-footer">
                        {this.props.webUrl === "" ? "": <a href={this.props.webUrl} className="card-link">WebSite</a>}
                        {this.props.donationUrl === "" ? "" : <a href={this.props.donationUrl} className="card-link">Donate</a>}
                    </div>
                </div>
            </div>
        )
    }
}

export default CharityCard;