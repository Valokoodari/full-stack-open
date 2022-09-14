const Notification = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }

  return (
    notification ? <div style={style}>{notification}</div> : null
  )
}

export default Notification
