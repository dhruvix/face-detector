import React from 'react';
import './ImageLinkForm.css';

function ImageLinkForm({onInputChange, onSubmit}) {
    return (
        <div>
            <div>
                <p className='f3 gold'>
                Type in the URL of an image with a face in it:
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
