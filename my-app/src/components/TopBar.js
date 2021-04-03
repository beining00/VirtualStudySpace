import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import SignIn , {SignOut, auth} from './SignIn';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

function TopBar(){
    const [user] = useAuthState(auth);

    const ue = (user) ? user.email : "";
    const [userEmail, setUserEmail] = React.useState(ue)
    
    React.useEffect(()=>{
        console.log(ue)
        console.log(user)
        setUserEmail(ue)
    
    }, []
    )
    console.log(user)

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            
            {user ? <SignOut setEmail = {setUserEmail} /> : <SignIn  setEmail = {setUserEmail} />}
            <Navbar.Brand href="#home">{userEmail}</Navbar.Brand>
            

        </Navbar>
        </>
    )
}

export default TopBar;