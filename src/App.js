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
import {reducer, INITIAL_STATE, setUser, setBox, setInput, setUrl, incrementCount, signOut, setSignIn, setRoute} from './Reducer'

function App() {

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  function loadUser(data){
    dispatch(setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }))
  }

  function calculateFaceLocation(data){
    console.log("API data:",data);
    const Faces = data.outputs[0].data.regions;
    console.log("faces from API: ",Faces);
    const image = document.getElementById('inputimage');
    console.log("given image",image);
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("width,height: ",width,height);
    const output = [];
    Faces.map((f,i)=>{
      var face = f.region_info.bounding_box;
      var square = {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }
      console.log("face",i,"calculated");
      output.push(square);
      return(i);
    })
    return output;
  }

  function displayBox(value){
    dispatch(setBox(value));
    console.log("box:",state.box);
  }

  function onInputChange(event) {
    dispatch(setInput(event.target.value));
    console.log(state.input);
  }

  function onSubmit() {
    dispatch(setUrl(state.input));
    fetch('https://evening-anchorage-72666.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: state.input
      })
    }).then(response => response.json())
      .then((response)=> {console.log("submitted");
        if(response){
          fetch('https://evening-anchorage-72666.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id:state.user.id
            })
          }).then(response => response.json())
          .then(count => {
            dispatch(incrementCount(count));
          })
        }
        displayBox(calculateFaceLocation(response));
      }).catch(err => console.log(err));
  }

  function onRouteChange(route) {
    if (route === 'signout') {
      dispatch(signOut());
    } else if (route === 'home') {
      dispatch(setSignIn());
    }
    dispatch(setRoute(route));
  }

  return (
    <div className="App">
       <Particles />
      <Navigation isSignedIn={state.isSignedIn} onRouteChange={onRouteChange} />
      { state.route === 'home'
        ? <div>
            <Logo />
            <Rank name={state.user.name} entries={state.user.entries}/>
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
            <FaceRecognition box={state.box} imageurl={state.imageurl} />
          </div>
        : (
          state.route === 'signin'
           ? <Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
           : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
          )
      }
    </div>
  );
}

export default App;

