import React, {PropTypes} from 'react'
import {container, title, slogan} from './styles.css'

export default function Home (props) {
  console.log('Sip')
  return (
    <div className={container}>
      <p className={title}>Hello, World!</p>
      <p className={slogan}>React boilerplate, with a touch of Redux</p>
    </div>
  )
}