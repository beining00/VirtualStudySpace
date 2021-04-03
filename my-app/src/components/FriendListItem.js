import React from 'react'
import firebase from './Firebase';


function FriendListItem(){
    //const friendId = props.friendId;
    const userId = 1;
    var dfRefObj = firebase.database().ref().child('users');

    //sync object changes 
    dfRefObj.on('value', snap =>{
        console.log('snap')
        console.log(snap.val())
        console.log('snap')
    })

    console.log("set data")
    firebase.database().ref('users/' + 2).set({
    
        email: 'aaa',
        profile_picture : 'aaa'
      });

    // database.child("users").child(userId).get().then(function(snapshot) {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //     }
    //     else {
    //       console.log("No data available");
    //     }
    //   }).catch(function(error) {
    //     console.error(error);
    //   });


}

export default FriendListItem;