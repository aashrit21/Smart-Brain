import React from 'react';


class SignIn extends React.Component{
	constructor(props){
		super(props)
		this.state={
			signInUsername:'',
			signInPassword:'',
			usernameError:false,
			passwordError:false

		}
	}

	onUsernameChange = (event)=>{
		this.setState({signInUsername: event.target.value});
	}
	onPasswordChange= (event) => {
		this.setState({signInPassword: event.target.value});
	}
	onSubmitSigin = (event)=>{
		this.setState({usernameError:false});
		this.setState({passwordError:false});
		if(this.state.signInUsername.length>0 && this.state.signInPassword.length>0){	
			event.preventDefault()
			fetch('https://afternoon-dawn-40069.herokuapp.com/signin', {
				method:'post',
				headers:{'content-type': 'application/json'},
				body: JSON.stringify({
					username: this.state.signInUsername,
					password: this.state.signInPassword,
				})			
			})
			.then(res => res.json())
			.then(user =>{
				if(user.id){
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			}).catch(err=>console.log('inavlid credantials'))
		} else{
			event.preventDefault()
			if(this.state.signInUsername.length===0){
				this.setState({usernameError:true})
			}
			if(this.state.signInPassword.length===0){
				this.setState({passwordError:true})
			}
		}
		
	}

	render(){
		let usernameError;
		if(this.state.usernameError){
			usernameError= <p className='dark-red ma0'>{"Username is Required!"}</p>
		}else{
			usernameError= 'Username'
		}
		let passwordError;
		if(this.state.passwordError){
			passwordError= <p className='dark-red ma0'>{"Password is Required!"}</p>
		}else{
			passwordError= 'Password'
		}

		const {onRouteChange}= this.props;
		return (
		  	<article className="br3 shadow-5 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 center"
		  	          style={{background:'rgba(124, 112, 219, 0.41)'}}>
				<main className="pa4 black-80 center">
				  <form className="measure ">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">{usernameError}</label>
				        <input className={"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (this.state.usernameError? ' b--dark-red' : '')}
				        	   type="text" 
				        	   name="username"  
				        	   id="username"
				        	   onChange = {this.onUsernameChange}

		        	     />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">{passwordError}</label>
				        <input className={"b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (this.state.passwordError? ' b--dark-red' : '') }
				               type="password" 
				               name="password"  
				               id="password"
				               onChange = {this.onPasswordChange}
		                 />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				       onClick = {this.onSubmitSigin}
				       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				        type="submit" 
				        value="Sign in"			       
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick = {()=> onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
				    </div>
				  </form>
				</main>
		</article>
 		); 
	}

} 
  

export default SignIn;