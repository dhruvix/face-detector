import React, { useContext } from 'react';
import { AppContext } from '../../App';

function Rank() {

    const app = useContext(AppContext);

    return (
        <div>
            <div className='yellow f3'>
                {`${app.state.user.name} , your entry count is...`}
                <div className='gold f1 '>
                    {app.state.user.entries}
                </div>
            </div>
        </div>
    )
}

export default Rank;
