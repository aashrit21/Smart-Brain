import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm =({onInputChange , onButtonClick , onkeypress})=>{
	return (
	  <div>
	  	<p className= 'f3'>
		 {'This Magic brain will detect the faces in your image. Give it a try!!'}
	  	</p>
	  	<div className = 'center'>
	  	  <div className = ' form pa4 ba3 shadow-5'>
	  		<input className='pa3 w-70 ba br3 ' 
	  				id = 'inputClear'
	  			   type = 'text' 
	  			   placeholder='Enter the Image Url'
	  			   onChange={onInputChange}
	  			   onKeyDown={onkeypress}
	  		 />
	  		<button className ='w-30 f4 pa3 link grow br3 bg-purple white b ba'
	  				onClick={onButtonClick}>
	  		 Detect
	  		</button>
	  	  </div>
	  	</div>
	  </div>	
 ); 
}
export default ImageLinkForm;