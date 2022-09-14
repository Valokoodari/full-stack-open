import { connect } from "react-redux"

const Notification = (props) => {
  const message = () => props.notification

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return message() ? <div style={style}>{message()}</div> : null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification
