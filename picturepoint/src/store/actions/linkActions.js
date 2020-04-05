// export const addLink = (link) => {
//     return(dispatch, getState, {getFirebase, getFirestore}) => {
//         const firestore = getFirestore();
//         firestore.collection('links').add({
//             ...link,
//             following: "t-tran",
//             follower: "j-hum",
//         }).then(() => {
//             dispatch({type: 'ADD_LINK', link});
//         }).catch((err) => {
//             dispatch({type: 'ADD_LINK_ERROR', err});
//         })
//     }
// }