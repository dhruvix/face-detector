import React from 'react';

function Rank({name, entries}) {
    return (
        <div>
            <div className='yellow f3'>
                {`${name} , your entry count is...`}
                <div className='gold f1 '>
                    {entries}
                </div>
            </div>
        </div>
    )
}

export default Rank;
