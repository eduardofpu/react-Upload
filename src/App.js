import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

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
    });
  }
  
  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="Smiley face" height="150" width="150"></img>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="App">  
      
       <input 
       style={{display: 'none'}} type="file" 
       onChange={this.fileSelectHandler}
       ref={fileInput => this.fileInput = fileInput}
       />
       <button onClick={() => this.fileInput.click()}>Pick File</button>
       <button onClick={this.fileUploadHandler}>Upload</button>
       <hr/>

       <div> {$imagePreview}</div>

      </div>

      
    );
  }
}

export default App;
