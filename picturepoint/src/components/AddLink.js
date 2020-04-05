// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { addLink } from '../store/actions/linkActions'

// class AddLink extends Component {
//     state = {
//         followed: '',
//         following: ''
//     }

//     handleChange = (e) => {
//         this.setState({
//             [e.target.id]: e.target.value
//         })
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         //console.log(this.state);
//         this.props.addLink(this.state)
//     }

//     render() {
//         return (
//             <div className="container">
//                 <form onSubmit={this.handleSubmit} className="white">
//                     <h5 className="grey-text text-darken-3">Create new link</h5>
//                     <div className="input-field">
//                         <label htmlFor="followed">followed</label>
//                         <input type="text" id="followed" onChange={this.handleChange} />
//                     </div>
//                     <div className="input-field">
//                         <label htmlFor="following">following</label>
//                         <input type="text" id="following" onChange={this.handleChange} />
//                     </div>
//                     <div className="input-field">
//                         <button className="btn pink lighten-1 z-depth-0">Add</button>
//                     </div>
//                 </form>
//             </div>
//         );
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addLink: (link) => dispatch(addLink(link))
//     }
// }

// export default connect(null, mapDispatchToProps)(AddLink)