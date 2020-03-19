import React, {useEffect, useState, Component } from "react";
import axios from "axios";
import https from "https";
import Dropzone from "react-dropzone";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const imageMaxSize = 2000000 //bytes 
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
  



class AddPhoto extends Component {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            imgSrc: null,
            caption: "",
            file: null
        }   
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({caption: e.target.value})
    }
    
    SubmitPicture = (event) => {
        event.preventDefault();
        //setup form
        //var form = document.getElementById('postPhoto')
        const formData = new FormData();
        console.log(this.state.caption);
        formData.append('image',this.state.file, this.state.file.name)
        formData.append('text', this.state.caption)

        //setup httpsAgent
        const httpsAgent = new https.Agent({ //TODO: Add SSL certification, Disabled for now 
            rejectUnauthorized: false
        });
        
        //sending post request to firebase functions
        axios({
            method: 'POST',
            url: 'https://us-central1-picturepoint-381cf.cloudfunctions.net/api/addPhoto', 
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            } ,
            https: httpsAgent
        })
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err.response);
        });
    };

    verifyFile = (files) => {
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    handleOnDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0){
            this.verifyFile(rejectedFiles)
        }


        if (files && files.length > 0){
             const isVerified = this.verifyFile(files)
             if (isVerified){
                 // imageBase64Data 
                 console.log(files[0]);
                 const currentFile = files[0]
                 const myFileItemReader = new FileReader()
                 myFileItemReader.addEventListener("load", ()=>{
                     console.log(myFileItemReader.result)
                     const myResult = myFileItemReader.result
                     this.setState({
                         imgSrc: myResult,
                         file: currentFile
                     })
                 }, false)

                 myFileItemReader.readAsDataURL(currentFile)

             }
        }
    }

    render() {
        const {imgSrc} = this.state
        return (
            <div>
                <box>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item direction="column" justify="space-evenly" alignItems="center">
                            <p>Preview: </p>
                            {imgSrc != null ? 
                            <div>
                                <img src={imgSrc} />
                            </div>
                            :
                            ""
                            }
                        </Grid>
                        <Grid item direction="column" justify="space-evenly" alignItems="center"> 
                            <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes} multiple={false} maxSize={imageMaxSize} >
                                {({getRootProps, getInputProps}) => (
                                <section className="container">
                                    <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                                )}
                            </Dropzone>
                            <TextField id="Caption" label="Caption" onChange={this.handleChange}/>
                            <Button variant="contained" color="inherit" onClick={this.SubmitPicture}>Upload</Button>
                        </Grid>
                    </Grid>
                </box>
            </div>
        );
    }
}

export default AddPhoto;