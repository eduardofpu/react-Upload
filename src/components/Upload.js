import React, { Component } from 'react'
import axios from 'axios';

import img from '../img/img.jpeg';
import Modal from './Modal';
import { FOTO_URL } from '../core/urls';

 class Upload extends Component {

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
     axios.post(FOTO_URL, fd, {
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
        <button className="btn btn-green" onClick={() => this.fileInput.click()}><h3 id="buttonBis">New File</h3></button>         
       );


      $isEnableUpload = (       
        <button className="btn btn-green" data-toggle="modal" data-target="#ExemploModalCentralizado" disabled={!this.state.isEnable}><h3 id="buttonEnable">Upload</h3></button> 
             
        );


    } else {
     
      $imagePreview = (
      <div className="previewText">
          <h1 id="titulo">Please select an Image for Preview</h1>
          <p><img src={img} alt="Smiley face" height="350" width="350"></img></p>
      </div>
      );

      $isEnablePickFile = (
        <button className="btn btn-green" onClick={() => this.fileInput.click()}><h3 id="buttonEnable">Pick File</h3></button>       
       );

      $isEnableUpload = (       
        <button className="btn btn-green" data-toggle="modal" data-target="#ExemploModalCentralizado" disabled={!this.state.isEnable}>   <h3 id="buttonDisable">Upload</h3></button>   
         
       );

    }
    
    return (     
     
     <div  className="App"> 

      <hr/>
      <div> {$imagePreview}</div>
      <br/>
        <input style={{display: 'none'}} type="file" onChange={this.fileSelectHandler} ref={fileInput => this.fileInput = fileInput}/>
          {$isEnablePickFile}  
          {$isEnableUpload}  
          <Modal fileUploadHandler = {this.fileUploadHandler.bind(this)}/>    
      </div>   
         
             
    )
  }
}

export default Upload;
