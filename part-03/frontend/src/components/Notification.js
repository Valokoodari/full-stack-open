import React from 'react'

/* eslint-disable react/prop-types */
const Notification = ({ notification }) => {
  if (notification === null) return
  const { type, message } = notification

  return <div id='notification-box' className={type}>
    {type === 'error' ? 'Error:' : ''} {message}
  </div>
}

export default Notification
