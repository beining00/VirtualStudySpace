import logo from '../logo.svg';
import '../css/App.css';
import SignIn from './SignIn';
import TopBar from './TopBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import LandingPage from './LandingPage'
import Firebase, {auth} from './Firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

//import Name from './Name';
function App() {
  const [user] = useAuthState(auth);
  return (

    
    <div className="App">
      <TopBar /> 
         {/* <Name /> */}
         <LandingPage />
         {
          user && ( <Layout /> )
         }
        
      
    </div>
  );
}

export default App;
