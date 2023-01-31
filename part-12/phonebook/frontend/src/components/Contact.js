import React from 'react'

/* eslint-disable react/prop-types */
const Contact = ({ name, number, onClick }) =>
  <div><button onClick={onClick}>x</button> {name} {number}</div>

export default Contact
