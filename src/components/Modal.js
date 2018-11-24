import React, { Component } from 'react'

 class Modal extends Component {
  render() {
    return (
        <div className="modal fade" id="ExemploModalCentralizado" tabIndex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="TituloModalCentralizado">Upload </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
               <h3>Deseja realizar Upload?</h3>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                <button type="button" className="btn btn-primary"onClick={this.props.fileUploadHandler}>Yes</button>
               
                
            </div>
            </div>
        </div>
       </div>
  
    )
  }
}

export default Modal;