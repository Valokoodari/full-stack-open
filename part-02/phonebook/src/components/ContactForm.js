const ContactForm = ({
    onSubmit, nameValue, numberValue, onNameChange, onNumberChange
  }) =>
    <form>
      <div>
        name: <input value={nameValue} onChange={onNameChange} />
        <br />
        number: <input value={numberValue} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>add</button>
      </div>
    </form>

export default ContactForm
