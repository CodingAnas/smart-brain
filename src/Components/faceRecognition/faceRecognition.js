import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="ma" style={{paddingLeft:'35%'}}>
      <div className="absolute mt2">
        <img id='inputImage' alt='' src={imageURL} width='500px' heigh='auto'/>
        {box.map((boxItem, index) => (
          <div 
            key={index} 
            className='boundingBox' 
            style={{top: boxItem.topRow, right: boxItem.rightCol, bottom: boxItem.bottomRow, left: boxItem.leftCol}}>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;