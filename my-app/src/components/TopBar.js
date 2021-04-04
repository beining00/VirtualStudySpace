import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import SignIn , {SignOut} from './SignIn';
import Firebase, {auth} from './Firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

function TopBar(){
    const [user] = useAuthState(auth);

    const ue = (user) ? user.email : "";
    const [userEmail, setUserEmail] = React.useState(ue)
    
    React.useEffect(()=>{
        console.log("TopBar Render")
        console.log(user)
        setUserEmail(userEmail)
    
    })
    console.log(user)

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            
            {user ? <SignOut setEmail = {setUserEmail} /> : <SignIn  setEmail = {setUserEmail} />}
            
            {"   "}
            <Navbar.Brand href="#home">{userEmail}</Navbar.Brand>
            

        </Navbar>
        </>
    )
}

export default TopBar;