import React from 'react';


class Register extends React.Component {
	constructor(props){
	  super(props)
	  this.state={
		username:'',
		password:'',
		email:'',
		usernameError: false,
		emailError:false,
		emailIsValid: true,
		passwordError: false,
		}
	}
	

	onUsernameChange = (event)=>{

		this.setState({username: event.target.value});
	}
	onPasswordChange= (event) => {
		this.setState({password: event.target.value});
	}
	onEmailChange= (event) => {
		const emailValidation= ()=>{
		const regexp= /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return regexp.test(event.target.value);
	};
	if(emailValidation()){
		this.setState({emailIsValid:true});
		this.setState({email: event.target.value});
	}else{
		this.setState({emailIsValid:false});
	}
	}
	onSubmitRegister = (event)=>{
		this.setState({usernameError:false})
		this.setState({emailError:false})
		this.setState({passwordError:false})
		if(this.state.username.length>0
		   && this.state.password.length>0
		   && this.state.email.length>0 
		   && this.state.emailIsValid===true) {

		event.preventDefault()
		fetch('https://afternoon-dawn-40069.herokuapp.com/register', {
			method:'post',
			headers:{'content-type': 'application/json'},
			body: JSON.stringify({
				username: this.state.username,
				email:this.state.email,
				password: this.state.password,
			})			
		})
		.then(res => res.json())
		.then(user =>{
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}else{
		event.preventDefault()
		if(this.state.username.length===0){
			this.setState({usernameError:true});			
		} 
		if(this.state.email.length===0){
			this.setState({emailError:true});
		}
		if(this.state.password.length===0){
			this.setState({passwordError:true});
		}
	}	
	}
	render(){
		let usernameError;
		 if(this.state.usernameError){
			usernameError=  <p className='b dark-red ma0'>{'Username is required!'}</p>
		} else{
			usernameError= 'Username';
		}
		let emailError;
		 if(this.state.emailError){
			emailError=  <p className='b dark-red ma0'>{'Email is required!'}</p>
		} else{
			emailError= 'Email';
		}
		let passwordError;
		 if(this.state.passwordError){
			passwordError=  <p className='b dark-red ma0'>{'Passwordis required!'}</p>
		} else{
			passwordError= 'Password';
		}
		const {onRouteChange} = this.props;

		let emailIsValid;
		if(this.state.emailIsValid===false){
			emailIsValid= <p className='b dark-red ma0'>Invalid Email!</p>
		}
	  return (
	  	<article className="br3 shadow-5 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 center" style={{background:'rgba(124, 112, 219, 0.41)'}}>
			<main className="pa4 black-80 center">
			  <form className="measure ">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>		     
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">{usernameError}</label>
			        <input className={"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 " + (this.state.usernameError? 'b--dark-red' : '')} 
			        	   type="text" 
			        	   name="username"  
			        	   id="username"
			        	   onChange ={this.onUsernameChange}
	        	     />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">{emailError}</label>
			        <input className={"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 "  + (this.state.emailError? ' b--dark-red' : '')} 
			        	   type="email" 
			        	   name="email"  
			        	   id="email"
			        	   onChange ={this.onEmailChange}
	        	      />
	        	      <div>{emailIsValid}</div>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">{passwordError}</label>
			        <input className={"b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  + (this.state.passwordError? ' b--dark-red  ' : '')} 
			        	   type="password" 
			        	   name="password"  
			        	   id="password"
			        	   onChange ={this.onPasswordChange}
	        	     />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			       type="submit" 
			       value="Register"
			       onClick = {this.onSubmitRegister}
			      />
			    </div>
			    <div className="lh-copy mt3">
			      <p className="f6 link dim black db pointer" onClick={()=> onRouteChange('signIn')}>Already have account?</p>
			    </div>
			  </form>
			</main>
		</article>
      ); 
	}
}
export default Register;






