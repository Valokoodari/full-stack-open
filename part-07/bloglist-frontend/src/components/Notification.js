const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div id="notification-box" className={notification.type}>
      <b>{notification.message}</b>
    </div>
  )
}

export default Notification
