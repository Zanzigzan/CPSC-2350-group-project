import React from 'react'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-10 pt-10'>
        <div className='text-3xl'>Oops! 404 Not Found</div>
        <Link className='text-3xl text-blue-400' to='/'>Go Back to Home Page</Link>
    </div>
  )
}
export default NotFoundPage