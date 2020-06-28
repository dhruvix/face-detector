import React,{useReducer} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Signin from './components/account/SignIn';
import Register from './components/account/Register';
import './App.css';
import Particles from './Particlejs';
import {reducer, INITIAL_STATE} from './global/Reducer';

export const AppContext = React.createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <AppContext.Provider value={{state,dispatch}}>
      <div className="App">
       <Particles />
      <Navigation />
      { state.route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm />
            <FaceRecognition />
          </div>
        : (
          state.route === 'signin'
           ? <Signin />
           : <Register />
          )
      }
      </div>
    </AppContext.Provider>
  );
}

export default App;

