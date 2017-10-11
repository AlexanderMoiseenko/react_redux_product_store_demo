/* eslint-disable */

import React from 'react'

import {Link} from 'react-router-dom'

const NotFound = () => (
   <div>
     <h1>404</h1>
     <h3>Page not found</h3>
     <p>Return to <Link to={'/'}>Main page</Link></p>
   </div>
);

export default NotFound
