import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Button from 'react-bootstrap/Button';





if (!firebase.apps.length){
    console.log(1)
    console.log(process.env.REACT_APP_FIREBAE_API_KEY)
    firebase.initializeApp({

        apiKey: process.env.REACT_APP_FIREBAE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    
    })

    

}

const auth = firebase.auth();
const firestore = firebase.firestore();
//const analytics = firebase.analytics();


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
                    console.log(result)
                    setEmail(result.additionalUserInfo.profile.email);
                  
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

export {SignOut, auth}; 
export default SignIn; 
