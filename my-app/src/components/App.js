import logo from '../logo.svg';
import '../css/App.css';
import SignIn from './SignIn';
import TopBar from './TopBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import FriendListItem from './FriendListItem'
import Layout from './Layout';

import Name from './Name';
function App() {
  return (
    <div className="App">
      <TopBar /> 
         {/* <Name /> */}
          <Layout />
      
    </div>
  );
}

export default App;
