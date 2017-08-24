import React from 'react';
import {Modal, Button} from 'react-bootstrap';

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
                <a href=""><i onClick={this.open} id="info" className="fa fa-info-circle fa-4x" aria-hidden="true"></i></a>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        One fine body...
                    </Modal.Body>

                    <Modal.Footer>
                        <Button>Close</Button>
                        <Button bsStyle="primary">Save changes</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }
}

export default Info