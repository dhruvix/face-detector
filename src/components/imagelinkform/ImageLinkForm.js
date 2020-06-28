import React, { useContext } from 'react';
import { AppContext } from '../../App';
import {setBox, setUrl, incrementCount, setInput} from '../../global/Reducer';
import './ImageLinkForm.css';

function ImageLinkForm() {

    const app = useContext(AppContext);

    function calculateFaceLocation(data){
        console.log("API data:",data);
        const Faces = data.outputs[0].data.regions;
        console.log("faces from API: ",Faces);
        const image = document.getElementById('inputimage');
        console.log("given image",image);
        const width = Number(image.width);
        const height = Number(image.height);
        console.log("width,height: ",width,height);
        const output = [];
        Faces.map((f,i)=>{
          var face = f.region_info.bounding_box;
          var square = {
            leftCol: face.left_col * width,
            topRow: face.top_row * height,
            rightCol: width - (face.right_col * width),
            bottomRow: height - (face.bottom_row * height)
          }
          console.log("face",i,"calculated");
          output.push(square);
          return(i);
        })
        return output;
      }
    
    function displayBox(value){
        app.dispatch(setBox(value));
        console.log("box:",app.state.box);
      }
    
    function onSubmit() {
        app.dispatch(setUrl(app.state.input));
        fetch('https://evening-anchorage-72666.herokuapp.com/imageurl', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: app.state.input
          })
        }).then(response => response.json())
          .then((response)=> {console.log("submitted");
            if(response){
              fetch('https://evening-anchorage-72666.herokuapp.com/image', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id:app.state.user.id
                })
              }).then(response => response.json())
              .then(count => {
                app.dispatch(incrementCount(count));
              })
            }
            displayBox(calculateFaceLocation(response));
          }).catch(err => console.log(err));
      }

    function onInputChange(event) {
        app.dispatch(setInput(event.target.value));
        console.log(app.state.input);
      }

    return (
        <div>
            <div>
                <p className='f3 gold'>
                Type in the URL of an image with faces in it:
                </p>
                <div className='centre'>
                    <div className='form centre pa4 br3 shadow-5'>
                        <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                        <button
                            className='w-30 grow f4 link ph3 pv2 dib yellow'
                            onClick = {onSubmit}
                        >Detect</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;
