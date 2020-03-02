import React, { Component } from "react";
import axios from "axios";
import https from "https";

export default class AddPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '', file: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.SubmitPicture = this.SubmitPicture.bind(this);
    }
    

    handleChange(event) {
        this.setState({
          [event.target.type]: event.target.value
        }) 
    }
    
    SubmitPicture(event) {
        event.preventDefault();
        const formData = new FormData();
        const httpsAgent = new https.Agent({ //TODO: Add SSL certification, Disabled for now 
            rejectUnauthorized: false
        });
        console.log(this.state.text);
        console.log(this.state.file);
        formData.append('text', this.state.caption);
        formData.append('file', this.state.file);
        axios.post(
                'http://localhost:8080/add.ejs',
                formData,
                httpsAgent,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            .then((response) => {
                // handle your response
            })
            .catch(() => {
                // handle your error
            });
    };

    render(){
        return (
            <div>
                {console.log("HELLO")}
            <form onSubmit={this.SubmitPicture}>
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
                onChange={this.handleChange}
                />
                <button type="submit">Upload</button>
            </form>
            </div>
        );
    }
}