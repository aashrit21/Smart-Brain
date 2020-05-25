import React from 'react';
import Tilt from 'react-tilt';
import Brain from './Brain.png';
import './Logo.css';

const Logo =()=>{
	return (
	  <div className='ma4 mt0' >
	  	<Tilt className="Tilt ba3 br3 shadow-5" options={{ max : 45 }} style={{ height: 100, width: 100 }} >
		 <div className="Tilt-inner"><img alt = 'Logo-Brain' src={Brain}/></div>
		</Tilt>
	  </div>	
 );
}
export default Logo;