import React from 'react';

class CharityCard extends React.Component{

    render(){
        return (
            <div className="col-lg-4 col-md-4 col-sm-6 col xs-12">
                <div className="card mt-4">
                    <div className="image">
                        <img src={this.props.imgUrl} alt="Not Provided" className="card-img-top"/>
                    </div>
                    <div className="card-block">
                        <h4 className="card-title">{this.props.charityName}</h4>
                        <p className="card-text">{this.props.description}</p>
                    </div>
                    <div className="card-footer">
                        <a href={this.props.webUrl} className="card-link">WebSite</a>
                        <a href={this.props.donationUrl} className="card-link">Donation Link</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharityCard;