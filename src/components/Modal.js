import React, { Component } from 'react'
import axios from 'axios';

import img from '../img/img.jpeg';

 class Modal extends Component {

  constructor(props){
    super(props);
    this.state = {file: '',imagePreviewUrl: '',image:'',isEnable: false};   
    this.fileUploadHandler=this.fileUploadHandler.bind();
  }

  state = {
    selectedFile: null,
    image:null
  }

  //Preview da imagem quando selecionada
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

   if(file!=null){
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
    }
    console.log('img',reader);
    reader.readAsDataURL(file);  

   //se a imagem for cancelada atualiza a pagina
    }else{  
      console.log("imagem cancelada");   
       window.location.reload();
    }     
  }

  //Seleciona a imagem
  fileSelectHandler = event => { 
   this.setState({
     selectedFile: event.target.files[0],

     //chama o preview da imagem   
     image: this.handleImageChange(event)
    
   }) 

  //  Ao selecionar a imagem o botão upload e ativado
   this.setState({isEnable : true});
  }

  //Salva no banco de dados a imagem
  fileUploadHandler = () => {
    const fd =  new FormData();
    fd.append('foto', this.state.selectedFile,this.state.selectedFile.name);
     axios.post('http://localhost:8181/foto', fd, {
       onUploadProgress: progressEvent => {
                  console.log('Upload Progress: '+ Math.round(progressEvent.loaded / progressEvent.total*100)+'%')

       }
      })
      .then(res => {
         console.log(res);
         alert("Upload Realizado");
         window.location.reload(); 
      });
    }
  
  render() {
    
    let {imagePreviewUrl} = this.state;   
   
    let $imagePreview = null;
    let $isEnablePickFile = null;
    let $isEnableUpload = null;
   

    if (imagePreviewUrl) {      
      $imagePreview = (   
        <div>
            <h2 id="selected"> Image Selected </h2>     
           <p>          
             <img src={imagePreviewUrl} alt="Smiley face" height="350" width="350"></img>
           </p>
        </div>
      );
      $isEnablePickFile = (
        <button onClick={() => this.fileInput.click()}><h3 id="buttonDisable">Pick File</h3></button>         
       );


      $isEnableUpload = (       
        <button data-toggle="modal" data-target="#ExemploModalCentralizado" disabled={!this.state.isEnable}>   <h3 id="buttonEnable">Upload</h3></button> 
             
        );


    } else {
     
      $imagePreview = (
      <div className="previewText">
          <h1 id="titulo">Please select an Image for Preview</h1>
          <p><img src={img} alt="Smiley face" height="350" width="350"></img></p>
      </div>
      );

      $isEnablePickFile = (
        <button onClick={() => this.fileInput.click()}><h3 id="buttonEnable">Pick File</h3></button>       
       );

      $isEnableUpload = (       
        <button data-toggle="modal" data-target="#ExemploModalCentralizado" disabled={!this.state.isEnable}>   <h3 id="buttonDisable">Upload</h3></button>   
         
       );

    }



    return (  
     
     
     <div  className="App"> 

      <hr/>
      <div> {$imagePreview}</div>
      <br/>
       <input 
       style={{display: 'none'}} type="file" 
       onChange={this.fileSelectHandler}
       ref={fileInput => this.fileInput = fileInput}
       />
        {$isEnablePickFile}  
        {$isEnableUpload}      
            
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
                    <button type="button" className="btn btn-primary"onClick={this.fileUploadHandler}>Yes</button>
                   
                    
                </div>
                </div>
            </div>
           </div>
      </div> 
             
    )
  }
}

export default Modal;
