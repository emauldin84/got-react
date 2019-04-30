import React from 'react'

function CharacterDetails({character}) {
    console.log({character})

    return (
        <>
            {/* <h3>Character Details</h3> */}
            <ul>
                {character[0] ? <li><strong>name:</strong> {character[0].name}</li> : null}
                {character[0] ? <li><strong>titles:</strong>  {character[0].titles}</li> : null}
                {character[0] ? <li><strong>aliases:</strong>  {character[0].aliases}</li> : null}
                {character[0] ? <li><strong>dob:</strong>  {character[0].born}</li> : null}

            </ul>
            
        </>
    )
}



export default CharacterDetails;