import React,{Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Signin from './components/account/SignIn';
import Register from './components/account/Register';
import './App.css';
import Clarifai from 'clarifai';
import Particles from './Particlejs';

const app = new Clarifai.App({
  apiKey: 'af6f1b614c5b4fc08c41f4591b0bf509'
 });

class App extends Component {

  constructor() {
    super();
    this.state = {
      input:'',
      imageurl:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) =>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log("data from API: ",clarifaiFace);
    const image = document.getElementById('inputimage');
    console.log(image);
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("width,height: ",width,height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBox(value){
    this.setState({box:value})
    console.log(this.state.box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(this.state.input);
  }

  onSubmit = () => {
    this.setState({imageurl:this.state.input})
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then((response)=> {console.log("submitted");
        if(response){
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id:this.state.user.id
            })
          }).then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
        }
        this.displayBox(this.calculateFaceLocation(response));})
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const { isSignedIn, imageurl, route, box } = this.state;
    return (
      <div className="App">
         <Particles />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition box={box} imageurl={imageurl} />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;

