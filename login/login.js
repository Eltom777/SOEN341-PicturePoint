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


  function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    alert("Signed Up")

  }


  function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);


    //take user to new Page
  }
// function signOut(){
//   auth.signOut();
//   alert("signed Out")
// }


auth.onAuthStateChanged(function(user){
  if(user){
  var email = user.email;
  alert("Active User" + email)
  window.location.href='after.html'
}
  else{
    alert("No Active user")
  }

});
