// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDTSp-jysKsVYkvrlOjAJBqZoU4GsjG-nk",
  authDomain: "picturepoint-381cf.firebaseapp.com",
  databaseURL: "https://picturepoint-381cf.firebaseio.com",
  projectId: "picturepoint-381cf",
  storageBucket: "picturepoint-381cf.appspot.com",
  messagingSenderId: "370534118114",
  appId: "1:370534118114:web:5025cb108da80915c564bb",
  measurementId: "G-8LPREMPPKG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    window.location.href='login.html';
  }
});

function logout(){
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  alert("Sign out successful");
	}).catch(function(error) {
	  // An error happened.
	  alert("Error signning out, please contact your web admin");
	});
}
