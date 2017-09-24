import React from "react";
import {connect} from "react-redux";
import scrollToElement from 'scroll-to-element';

class FeaturedCarousel extends React.Component{
    scrollToTakeAction(event){
        event.preventDefault();
        var takeActionDiv = document.getElementById("takeAction");
        scrollToElement(takeActionDiv, {
            offset: 0,
            duration: 1300
        });
    }

    render(){
        var hide = this.props.facts.length === 0;
        return (
            <div hidden={hide} id="featured" style={{ 'padding-bottom': "50px"}} className="container-fluid section-container">
                <div id="background2"></div>
                <h3 style={{color: "white"}}className="text-center pt-4 pb-4">Projects in need of urgent help</h3>
                <div id="carouselFeaturedCharities" className="carousel slide" data-ride="carousel" >
                    <ol className="carousel-indicators m-0">
                        {this.props.featured.map((project, index)=> {
                            var active = index === 0 ? "active" : "";
                            return (
                                <li data-target = "carouselFeaturedCharities" data-slide-to={index} className={active}></li>
                            )
                        })}
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        {
                            this.props.featured.map( (project, index) => {
                                var active = index === 0 ? "active" : "";
                                var images = project.image.imagelink
                                var imageURL = images[images.length-1].url;
                                var fundingPercentile = (project.funding*100)/project.goal;
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
                                return(
                                    <div className={`carousel-item ${active}`}>
                                        <img className="d-block img-fluid" src={imageURL} alt="First slide" />
                                        <div className="carousel-caption d-md-block">
                                            <h5>{project.title}</h5>
                                            <div className="row mt-4">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-right p-2">
                                                    <a target="_blank" href={project.projectLink} style={{width: "65%"}} className="btn btn-success btn-md mb-2">Donate</a>
                                                </div> 
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left p-2">
                                                    <a onClick={this.scrollToTakeAction} style={{width: "65%"}} className="btn btn-primary btn-md">Search More</a>
                                                </div>
                                            </div>
                                            <div title={`${fundingPercentile.toFixed(2)}% funded`} className="progress" style={{width: "68%", margin: "auto"}}>
                                                <div className={`progress-bar ${fundingBg} progress-bar-striped active`} style={{width: `${fundingPercentile}%`}} role="progressbar" aria-valuenow={fundingPercentile} aria-valuemin="0" aria-valuemax="100">
                                                    {fundingPercentile.toFixed(2)}% funded
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <a className="carousel-control-prev" href="#carouselFeaturedCharities" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselFeaturedCharities" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        featured: state.featured,
        facts: state.facts
    }
}



export default connect(mapStateToProps)(FeaturedCarousel);