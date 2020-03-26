import Particles from 'react-particles-js';
import React from 'react';
import './Particlejs.css';

function Particlejs(){
    return(
        <Particles className="particles"
            params={{
                  particles: {
                      number: {
                          value: 75,
                          density: {
                              enable: true,
                              value_area: 800
                          }
                      }
                  }
              }} />
    )
}

export default Particlejs;