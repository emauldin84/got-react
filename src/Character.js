import React from 'react'

function Character ({data, _handleClick}) {
    return (
        <>
            <ul>
                <li onClick={(e) => {
                    _handleClick(e.target.textContent)
                }
                }>{data.name}</li>
            </ul>
        </>
    )
}




export default Character