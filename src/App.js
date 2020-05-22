import React,{Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Signin from './components/account/SignIn';
import Register from './components/account/Register';
import './App.css';
import Particles from './Particlejs';

const initialstate ={
  input:'',
  imageurl:'',
  box:[],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {

  constructor() {
    super();
    this.state = initialstate;
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

  displayBox(value){
    this.setState({box:value})
    console.log("box:",this.state.box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(this.state.input);
  }

  onSubmit = () => {
    this.setState({imageurl:this.state.input})
    fetch('https://evening-anchorage-72666.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then((response)=> {console.log("submitted");
        if(response){
          fetch('https://evening-anchorage-72666.herokuapp.com/image', {
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
        this.displayBox(this.calculateFaceLocation(response));
      }).catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialstate)
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

