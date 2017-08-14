import React from 'react';

const FactItem = ({fact, visibility})=> {
    return (
        <li key={0} hidden={visibility} className="list-group-item">{fact}</li>
    )
}

export default FactItem;