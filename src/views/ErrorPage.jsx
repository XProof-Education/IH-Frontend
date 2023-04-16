import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>Ooops something went wrong while fetching the information you requested. Here is an alternative: <Link to={'/'}>Home</Link></div>
  )
}

export default ErrorPage;