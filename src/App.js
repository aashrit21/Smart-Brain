import React,{Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank';
import Clarifai from 'clarifai';
import ImageBox from './Components/ImageBox/ImageBox';


const app = new Clarifai.App({
 apiKey: '124bd44297804439941821adffd1f71d'
});



const ParticlesOptions= {
    particles: {
      number:{
        value:50,
        density:{
          enable:true,
          value_area:800,
        }
      }
         }
  }

  const initialState={
    inputField:'',
      imageUrl:'',
      box:{},
      route: 'signIn',
      isSignIn: false,
      user: {
        id:'',
        username: '',
        email: '',
        enteries: 0,
        joined: ''
      }
  }

class App extends Component {
  constructor(){
    super()
    this.state= initialState;
  }

  loadUser = (data)=>{
    this.setState({user:{
       id:data.id,
       username: data.username,
       email: data.email,
       enteries: data.enteries,
       joined: data.join
    }})
  }

  clearfaiBoxInput= (data)=>{
    const clearfaiData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("faceImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clearfaiData.left_col * width,
      topRow:clearfaiData.top_row * height,
      bottomRow: height - (clearfaiData.bottom_row * height),
      rightCol: width - (clearfaiData.right_col * width)
    }
      
      
  }

  clearInputField=()=>{
    const input= document.getElementById("inputClear");
    input.value= '';
  }

  displayBox=(cordinate)=>{
    this.setState({box: cordinate});
  }
 

  onInputChange = (event)=>{
    console.log(event.target.value)
    this.setState({inputField:event.target.value})

       
  }
  onKeyPress =(e)=>{
    if(e.keyCode===13){
      this.getReponse();
      this.clearInputField();
    }
  }

  getReponse = ()=>{
    this.setState({imageUrl: this.state.inputField})
    app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", this.state.inputField)
    .then(response => {
      fetch('https://afternoon-dawn-40069.herokuapp.com/image', {
        method: 'put',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id,
      })
      })
      .then(res => res.json())
      .then(enteries=>{
        this.setState(Object.assign(this.state.user , {enteries: enteries}))
      } )
      this.displayBox(this.clearfaiBoxInput(response))
    })
    .catch(err => console.log(err));
  }

  onButtonClick = ()=>{
    this.getReponse()
    this.clearInputField();
  }

  onRouteChange= (route)=>{
    if(route==='signIn'){
      this.setState(initialState)
    } else if(route==='home'){
      this.setState({isSignIn:true})
    }
    this.setState({route:route})
  }

 render(){
    return (
      <div className="App">
        <Particles className='particle' params={ParticlesOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn} onSignout={this.onSignout} />
        {this.state.route==='signIn'
         ? <SignIn  loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
         :this.state.route==='register' 
         ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
         :<div>
           <Logo />
           <Rank  username={this.state.user.username} enteries ={this.state.user.enteries}/>
           <ImageLinkForm onkeypress={this.onKeyPress} onButtonClick={this.onButtonClick} onInputChange={this.onInputChange}/>
           <ImageBox imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>        
        }        
      </div>
  );
 } 
}

export default App;
