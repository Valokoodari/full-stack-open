import React from 'react'

/* eslint-disable react/prop-types */
const Filter = ({value, onChange}) =>
  <div>
    search by name <input value={value} onChange={onChange} />
  </div>

export default Filter
