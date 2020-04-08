
//React Components
import React, { Component } from "react";
import {DropzoneArea} from 'material-ui-dropzone'
import PropTypes from 'prop-types';

//Firebase Function
import {addPhoto} from "../Firebase/functions/addPhoto"

//Material UI Components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg'
const imageMaxSize = 2000000 //bytes 
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

const styles = () => ({
    paper: {
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        height: 500, 
        width: 850,
        backgroundColor: 'whitesmoke',
    },
    paperImage: {
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    card: {
        height: 360,
        width: 360
    },
    image: {
        height: 360,
        width: 360
    },
    preview: {
        height: 400,
        width: 400
    },
});


class AddPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: null,
            caption: "",
            file: null,
            isUploaded: null,
            error: null,
        } 
    }

    handleCaption = (e) => {
        //console.log(e.target.value);
        this.setState({caption: e.target.value})
    }
    
    SubmitPicture = (event) => {
        event.preventDefault();
        
        //console.log(this.state.file);
        
        addPhoto(this.state.file, this.state.caption,
        (callback) =>{
            if(callback != null){
                this.setState({isUploaded: callback});
            }
            else{
                this.setState({error: "Internal server error ! Check console"})
            }
        });
    };

    handleOnDrop = (files) => {
        // imageBase64Data 
        //console.log(files[0]);
        const currentFile = files[0]
        const myFileItemReader = new FileReader() //Parse the image 
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

    render() {
        const {imgSrc, file, isUploaded, error} = this.state
        const {classes} = this.props;
        var isInvalid = file == null;
        
        return (
            <div>
                <Box display="flex" justifyContent="center">
                    <Paper className={classes.paper} elevation={3}>
                        <Grid container className={"marginTop: 10"} xs={10}>
                            <Typography variant="h6" color="inherit">
                                Preview:
                            </Typography>
                        </Grid>
                        <Grid container className={"marginTop: inherit"} justify="center" spacing={5}>
                            <Grid item className={classes.preview} xs={10} sm={5} direction="column" justify="center">
                                {imgSrc != null ? 
                                
                                <div>
                                    <Card className={classes.card}>
                                        <CardMedia className={classes.image} image={imgSrc} title={this.state.caption}/>
                                    </Card>
                                </div>
                                :
                                ""
                                }
                            </Grid>
                            <Grid item xs={12} sm={6} direction="column" justify="center">
                                <DropzoneArea className={classes.dropbox} onChange={this.handleOnDrop} showAlerts={false} acceptedFiles={acceptedFileTypesArray} filesLimit={1} maxFileSize={imageMaxSize} dropzoneText="Drag'n'Drop an Image or Click !" showPreviewsInDropzone={false} />
                                <Grid container item justify="center">
                                    <TextField id="Caption" label="Caption" onChange={this.handleCaption}/>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={5} justify="center" >
                                {isUploaded != null ? <p style={{ color: "green" }}>{`"${file.name}" was successfully uploaded`}</p>: ""}
                                {error != null ? <p style={{ color: "red" }}>{error}</p> : ""}
                            </Grid>
                            <Grid container item className={"marginTop: 10"} xs={12} spacing={5} justify="center" >
                                <Button disabled={isInvalid} variant="contained" color="primary" onClick={this.SubmitPicture}>Upload</Button>
                            </Grid> 
                        </Grid>
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