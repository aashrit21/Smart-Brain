import React from 'react';
import'./ImageBox.css';

const ImageBox = ({imageUrl, box})=>{
	return (

		<div className= 'center'>
			<div className ='absolute mt3'>
			  <img id='faceImage' alt='' src ={imageUrl} width='600px' height='auto'/>
			  <div className ='faceBox' style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
			</div>
		</div>

  );
}

export default ImageBox;