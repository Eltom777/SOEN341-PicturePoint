import React, { Component } from "react";
import axios from "axios";
import https from "https";



class AddPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {text: "", file: null, fileName: ""};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.SubmitPicture = this.SubmitPicture.bind(this);
    }
    
    handleChange(event) {
        this.setState({
          [event.target.type]: event.target.value
        }); 
    }

    handleImageChange(event){
        const image = event.target.files[0];
        console.log(image);
        this.setState({
            file: event.target.files[0],
            fileName: image.name
        });
    }
    
    SubmitPicture(event) {
        event.preventDefault();
        //setup form
        var form = document.getElementById('postPhoto')
        const formData = new FormData(form);

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

    render(){
        return (
            <div>
            <form id="postPhoto" onSubmit={this.SubmitPicture}>
                <input 
                label="Caption"
                type="text"
                name="Caption"
                onChange={this.handleChange}
                />
                <input 
                label="Upload Picture" 
                type="file"
                name="picture"
                onChange={this.handleImageChange}
                />
                <button type="submit">Upload</button>
            </form>
            </div>
        );
    }
}

export default AddPhoto;