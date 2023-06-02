import React from 'react'
import '../styling.css';

function Semester({id, name, image}) {
  return (
    <div className='semester'>
        <div className='semester__number'>
            <p>{id}</p>
            
        </div>
        
        <div className='semester__name'>
            <p>{name}</p>
        </div>

        {/* <button onClick={addToBasket}>Add to Basket</button> */}
        <div className='product__image'>
            <img src={image}></img>
        </div>
    </div>
  )
}

export default Semester