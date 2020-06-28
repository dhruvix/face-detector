import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { signOut, setRoute } from '../../global/Reducer';

function Navigation() {

    const app = useContext(AppContext);

    if (app.state.isSignedIn) {
        return (
          <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <a href="https://github.com/dhruvix" target="_blank" rel="noopener noreferrer"><p style={{position:'absolute', left:'5px'}} className='f3 gold pa3 link dim pointer'>Face Detector 2e</p></a>
            <p onClick={() => {app.dispatch(signOut()); app.dispatch(setRoute('signout'));}} className='f3 link dim gold underline pa3 pointer'>Sign Out</p>
          </nav>
        );
      } else {
        return (
          <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p style={{position:'absolute', left:'5px'}} className='f3 gold pa3'>Face Detector 2e</p> 
            <p onClick={() => app.dispatch(setRoute('signin'))} className='f3 link dim gold underline pa3 pointer'>Sign In</p>
            <p onClick={() => app.dispatch(setRoute('register'))} className='f3 link dim gold underline pa3 pointer'>Register</p>
          </nav>
        );
      }
}

export default Navigation
