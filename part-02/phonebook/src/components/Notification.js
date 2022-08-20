const Notification = ({ notification }) => {
  if (notification === null) return

  return <div id="notification-box">{notification.message}</div>
}

export default Notification
