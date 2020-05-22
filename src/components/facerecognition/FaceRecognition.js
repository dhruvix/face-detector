import React from 'react';
import './FaceRecognition.css';


function FaceRecognition({imageurl,box}) {
    return (
        <div className='centre ma'>
      <div className='absolute mt2 mb2'>
        <img id='inputimage' alt='' src={imageurl} width='500px' heigh='auto'/>
        {
          (box.length !== 0)?
            (box.map((a,i)=>{
              console.log("face",i,"recieved");
              return(
              <div className='bounding-box' key={i} style={{top: a.topRow, right: a.rightCol, bottom: a.bottomRow, left: a.leftCol}}></div>
            )
            }))
            :
            (console.log("no face detected yet"))
        }
      </div>
      <a href="https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection" target="_blank" rel="noopener noreferrer"><p className="gold pointer dim">courtesy: Clarifai API</p></a>
    </div>
    )
}

export default FaceRecognition;
