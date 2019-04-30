import React from 'react';

function SearchBar ({search}) {
    return (
        <>
        <h5>Search Characters:</h5>
        <input type='text' onChange={search}/>
        </>
    )
}


export default SearchBar;