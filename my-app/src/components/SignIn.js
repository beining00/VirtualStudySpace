import React from 'react';
import Button from 'react-bootstrap/Button';
import firebase , {auth}from './Firebase';




function SignOut(props){
    const setEmail = props.setEmail;

    const mySignOut = ()=>{
        auth.signOut();
        setEmail("");
    }


    return auth.currentUser && (
        <>
        <Button onClick = {() =>  mySignOut()}> Sign Out</Button>
        </>

    )

}


function SignIn(props){
    const setEmail = props.setEmail;

    function rtdb_presence() {
        // [START rtdb_presence]
        // Fetch the current user's ID from Firebase Authentication.
        var uid = firebase.auth().currentUser.uid;
    
        // Create a reference to this user's specific status node.
        // This is where we will store data about being online/offline.
        var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
    
        // We'll create two constants which we will write to 
        // the Realtime database when this device is offline
        // or online.
        var isOfflineForDatabase = {
            state: 'offline',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        };
    
        var isOnlineForDatabase = {
            state: 'online',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        };
    
        // Create a reference to the special '.info/connected' path in 
        // Realtime Database. This path returns `true` when connected
        // and `false` when disconnected.
        firebase.database().ref('.info/connected').on('value', function(snapshot) {
            // If we're not currently connected, don't do anything.
            if (snapshot.val() == false) {
                return;
            };
    
            // If we are currently connected, then use the 'onDisconnect()' 
            // method to add a set which will only trigger once this 
            // client has disconnected by closing the app, 
            // losing internet, or any other means.
            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
                // The promise returned from .onDisconnect().set() will
                // resolve as soon as the server acknowledges the onDisconnect() 
                // request, NOT once we've actually disconnected:
                // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect
    
                // We can now safely set ourselves as 'online' knowing that the
                // server will mark us as offline once we lose connection.
                userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });
        // [END rtdb_presence]
    }

    const signInwithGoogle  =()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
                .signInWithPopup(provider)
                .then((result) => {
                    /** @type {firebase.auth.OAuthCredential} */
                    var credential = result.credential;

                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    console.log("sign in success")
                    console.log(result)
                    setEmail(result.additionalUserInfo.profile.email);
                    rtdb_presence();
                  
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
    }
    return (
        <Button onClick = {signInwithGoogle}> Sign In With Google</Button>
    )

}

export {SignOut}; 
export default SignIn; 
