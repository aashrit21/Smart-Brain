import React from 'react';


const Rank =({username , enteries})=>{
	return (
	  <div>
	  	<div className='f3 white '>
	  	  {`${username} Your Entry Count is..`}
	  	</div>
		<div className='f1 white b'>
		  {`#${enteries}`}
		</div>
	  </div>		
 ); 
}
export default Rank;