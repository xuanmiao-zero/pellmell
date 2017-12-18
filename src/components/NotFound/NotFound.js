// components/NotFound.js
import React from 'react';
let clientHeight = document.documentElement.clientHeight
const NotFound = () =>
  <div  style={{textAlign: 'center', height:clientHeight, display: 'block',fontFamily: 'Helvetica, Arial, Sans-Serif', backgroundColor: '#2D72D9', color: '#fff'}}>
    <h1 style={{fontSize: 220, position: 'relative', top: '50%', transform: 'translateY(-50%)', margin: 0}}>404</h1>
  </div>

export default NotFound;