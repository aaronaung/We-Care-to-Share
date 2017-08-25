import React from 'react';

class Info extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {showModal: false}
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open(e){
        e.preventDefault();
        this.setState({showModal: true})
    }

    close(){
        this.setState({showModal: false})
    }

    render(){
        return (
            <div>
                <a href="#myModal" data-toggle="modal"><i onClick={this.open} id="info" className="fa fa-info-circle fa-3x" aria-hidden="true"></i> </a>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Credits</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>All data displayed on the website is pulled from <a target="_blank" href="https://www.globalgiving.org"><i>Global Giving, Inc.</i> </a> and 
                                <a href="https://www.dosomething.org" target="_blank"><i> Do Something, Inc.</i> </a></p>
                                <div className="card">
                                    
                                    <div className="card-block">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pb-4">
                                                <h6 className="card-title">Developer's Contact Info</h6>
                                                <p className="mb-0">  <small><i className="fa fa-envelope mr-2" aria-hidden="true"></i><u>aaronaung.95@gmail.com</u></small></p>
                                                <p className="mb-0">  <small><i className="fa fa-phone mr-2" aria-hidden="true"></i>(999) 888-7777</small></p>
                                                <p className="mb-0">  <small><i className="fa fa-address-book mr-2" aria-hidden="true"></i>Irvine, CA</small></p>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                <img id="developer-img" src={require("../img/headshot1.jpg")} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Info