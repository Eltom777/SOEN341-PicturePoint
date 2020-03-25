import React, {useEffect, useState, Component } from "react";
import axios from "axios";
import https from "https";
import Dropzone from "react-dropzone";
import {DropzoneArea} from 'material-ui-dropzone'
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import LinearProgress from '@material-ui/core/LinearProgress';


const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const imageMaxSize = 2000000 //bytes 
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

const styles = theme => ({
    paper: {
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        height: 800, 
        width: 900,
        overflow: 'auto',
        backgroundColor: 'whitesmoke',
    },
    paperImage: {
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    card: {
        marginTop: 10,
        height: 360,
        width: 360
    },
    image: {
        height: 360,
        width: 360
    }
});


class AddPhoto extends Component {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            imgSrc: null,
            caption: "",
            file: null,
            progress: 0,
            isUploading: false
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
            onUploadProgress: progressEvent =>{
                var currentProgress = Math.round( (progressEvent.load/progressEvent.total) * 100 )
                console.log("Upload Progress: " + currentProgress)
                if(currentProgress < 100){
                    this.setState({
                        progress: currentProgress,
                        isUploading: true
                    })
                }
                else{
                    this.setState({
                        progress: currentProgress,
                        isUploading: false
                    })
                }
            },
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
        const {classes} = this.props;
        
        return (
            <div>
                <Box display="flex" justifyContent="center">
                    <Paper className={classes.paper} elevation={3}>
                        <Grid container justify="center" spacing={5}>
                                <Grid item direction="column" justify="center">
                                    <Typography variant="h3" color="inherit">
                                        Preview:
                                    </Typography>
                                    {imgSrc != null ? 
                                     
                                    <div>
                                        <Card className={classes.card}>
                                            <CardHeader title={this.state.caption} subheader={new Date().toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" })}/>
                                            <CardMedia className={classes.image} image={imgSrc} title={this.state.caption}/>
                                        </Card>
                                    </div>
                                    :
                                    ""
                                    }
                                </Grid>
                                <Grid item direction="column" justify="center">
                                    <DropzoneArea onChange={this.handleOnDrop} showAlerts={false} acceptedFiles={acceptedFileTypesArray} filesLimit={1} maxFileSize={imageMaxSize} dropzoneText="Drag'n'Drop an Image or Click !" showPreviewsInDropzone={false} />
                                    <TextField id="Caption" label="Caption" onChange={this.handleChange}/>
                                    <Button variant="contained" color="inherit" onClick={this.SubmitPicture}>Upload</Button>
                                </Grid> 
                        </Grid>
                        { this.state.isUploading ? <LinearProgress variant="determinate" value={this.state.progress} /> : ""}
                        {(this.state.progress == 100) ? <Typography variant="h3" color="inherit">Image Successfully Uploaded</Typography> : ""}
                    </Paper> 
                </Box>
            </div>
        );
    }
}

AddPhoto.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPhoto);

/*
<Dropzone onDrop={this.handleOnDrop} acceptedFiles={acceptedFileTypes} filesLimit={1} maxFileSize={imageMaxSize} showPreviews={false}>
                                        {({getRootProps, getInputProps}) => (
                                        <section className="container">
                                            <div {...getRootProps({className: 'dropzone'})}>
                                            <input {...getInputProps()} />
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                            </div>
                                        </section>
                                        )}
                                    </Dropzone>
*/