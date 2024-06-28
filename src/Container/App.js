import './App.css';
import React, {Component} from 'react'
import Navigation from '../Components/Navigation/Navigation'
import Logo from '../Components/Logo/Logo'
import Linkform from '../Components/Linkform/Linkform'
import Rank from '../Components/Rank/Rank'
import ParticlesBg from 'particles-bg'
import FaceRecognition from '../Components/faceRecognition/faceRecognition'
import Signin from '../Components/SignIn/SignIn'
import Register from '../Components/Register/Register'
import 'tachyons'

// const getClarifaiReq = (imageURL)=>{
  
//   const PAT = '29473cd21bfc4c81b7f0f37ef535957e';
//   const USER_ID = 'epkj8ltuldit';
//   const APP_ID = 'SmartBrain';
//   const IMAGE_URL = imageURL;
//   const raw = JSON.stringify({
//       "user_app_id": {
//           "user_id": USER_ID,
//           "app_id": APP_ID
//       },
//       "inputs": [
//           {
//               "data": {
//                   "image": {
//                       "url": IMAGE_URL
//                       // "base64": IMAGE_BYTES_STRING
//                   }
//               }
//           }
//       ]
//   });

//   const requestOptions = {
//       method: 'POST',
//       headers: {
//           'Accept': 'application/json',
//           'Authorization': 'Key ' + PAT
//       },
//       body: raw
//   };
//   return requestOptions;
// }

const initial_state = {
  input:'',
  imageURL:'',
  box:[],
  route:'signin',
  isSignedIn: false,
  user: {
    id: 0,
    name:'',
    email:'',
    password:'',
    entries: 0
  }
}

class App extends Component{

  constructor()
  {
    super();
    this.state = {
      input:'',
      imageURL:'',
      box:[],
      route:'signin',
      isSignedIn: false,
      user: {
        id: 0,
        name:'',
        email:'',
        password:'',
        entries: 0
      }
    }
  }

  calcBox = (boundingBox)=>{
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);
    return{
      topRow : boundingBox.top_row * height,
      leftCol : boundingBox.left_col * width,
      bottomRow : height - (boundingBox.bottom_row * height),
      rightCol : width - (boundingBox.right_col * width)
    };
  }

  clarifaiFace = (ordinate)=>{
    this.setState({box: ordinate})
  }

  onInput = (event)=>{
    this.setState({input : event.target.value})
  }

  onSubmit = (event)=>{
    this.setState({imageURL : this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", getClarifaiReq(this.state.input))
    .then(response => response.json())
    .then(result => {
      if(result)
      {
        const regions = result.outputs[0].data.regions;
        const newBoxes = regions.map(region => this.calcBox(region.region_info.bounding_box))
        this.setState({ imageURL: this.state.input, box: [...newBoxes] });
        fetch('http://localhost:3000/images', 
        {
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count})) 
          })
          .catch(console.log)
      }
    })
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route)=>{
    if(route === 'signout')
    {
      this.setState(initial_state)
    }
    else
    {
      this.setState({isSignedIn: route === 'home' ? true : false})
      this.setState({route: route})
    }
  }

  loadUser = (user) => {
    this.setState({user:{
      id: user.id,
      name:user.name,
      email:user.email,
      password:user.password,
      entries: user.entries
    }})
  }

  render(){
    console.log(this.state.user)
    const {isSignedIn, route, imageURL, box} = this.state;
    return(
      <div className="App">
        <ParticlesBg className="particles" type="cobweb" bg={true} />
        <Navigation 
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ?
          <div>
            <Logo />
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <Linkform 
              onInput={this.onInput} 
              onSubmit={this.onSubmit}
            />
            <FaceRecognition 
              imageURL={imageURL}
              box={box}
            />
          </div>
          : route === "signin" ?
            <Signin 
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
            :
            <Register 
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
        }
      </div>
    );
  }
}

export default App;
