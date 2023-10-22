import React from 'react'
import '../App.css'
import error from '../assets/404-error.svg'

function Error() {
  return (
    <div>
        <img src={error} alt='error occured' className='error'></img>
    </div>
  )
}

export default Error