import React from 'react';

const Navigation =({onRouteChange , isSignIn })=>{
	if(isSignIn){
		return (
	  <nav className = 'flex justify-end pa3 f3 link dim pointer'>
	  	<p onClick={()=>onRouteChange('signIn')}>{'Sign Out'}</p>
	  </nav>	
 );
	} else{
		return (<nav className = 'flex justify-end pa3  f3 '>
			  	  <p className='pointer link dim ph4 underline' onClick={()=>onRouteChange('signIn')}>{'Sign In'}</p>
			  	  <p className='pointer link dim underline' onClick={()=>onRouteChange('register')}>{'Register'}</p>
			    </nav>)
	}
}
export default Navigation;