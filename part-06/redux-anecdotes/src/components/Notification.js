import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector(state => state.notification)

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return message ? <div style={style}>{message}</div> : null
}

export default Notification