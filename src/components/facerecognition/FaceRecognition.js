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
              <div className='bounding-box' style={{top: a.topRow, right: a.rightCol, bottom: a.bottomRow, left: a.leftCol}}></div>
            )
            }))
            :
            (console.log("no face detected"))
        }
      </div>
      <p className="gold">courtesy: Clarifai API</p>
    </div>
    )
}

export default FaceRecognition;
