import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import img from './img/img.jpeg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  state = {
    selectedFile: null,
    image:null    
  }


  //Seleciona a imagem
  fileSelectHandler = event => {   
   this.setState({
     selectedFile: event.target.files[0],     
     image:  this.handleImageChange(event)  
   })  
  }


  //Preview da imagem quando selecionada
  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    console.log('img',reader);
    reader.readAsDataURL(file);
    
  }

  //Salva no banco de dados a imagem
  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('foto', this.state.selectedFile,this.state.selectedFile.name);

    axios.post('http://localhost:8181/foto', fd, {
     onUploadProgress: progressEvent => {
       console.log('Upload Progress: '+ Math.round(progressEvent.loaded / progressEvent.total*100)+'%')
     }
    })
    .then(res => {
       console.log(res);
       alert("Upload Realizado");
    });
  }

  
  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {      
      $imagePreview = (   
        <div>
            <h2 id="selected"> Image Selected </h2>     
           <p>          
             <img src={imagePreviewUrl} alt="Smiley face" height="350" width="350"></img>
           </p>
        </div>
      );


    } else {
      $imagePreview = (
      <div className="previewText">
          <h1 id="titulo">Please select an Image for Preview</h1>
          <p><img src={img} alt="Smiley face" height="350" width="350"></img></p>
      </div>
      );

    }

   
    return (

      <div className="App">         
      <hr/>
      <div> {$imagePreview}</div>
      <br/>
       <input 
       style={{display: 'none'}} type="file" 
       onChange={this.fileSelectHandler}
       ref={fileInput => this.fileInput = fileInput}
       />
       <button onClick={() => this.fileInput.click()}><h3 id="button">Pick File</h3></button>
       <button onClick={this.fileUploadHandler}><h3 id="button">Upload</h3></button>
      
      </div>

      
    );
  }
}

export default App;
