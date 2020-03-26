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
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //console.log(clarifaiFace);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width,height);
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
  }

  onSubmit = () => {
    this.setState({imageurl:this.state.input})
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then((response)=> {this.displayBox(this.calculateFaceLocation(response));})
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
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
         <Particles />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
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

// af6f1b614c5b4fc08c41f4591b0bf509

//https://cdn.britannica.com/18/136518-050-CD0E49C6/The-Beatles-Ringo-Starr-Paul-McCartney-George.jpg
//https://pbs.twimg.com/profile_images/1134082549041393672/QbihPzrL_400x400.png
