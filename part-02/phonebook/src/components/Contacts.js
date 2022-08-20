import Contact from './Contact'

const Contacts = ({ contacts, onDelete }) =>
  <div>
    {contacts.map(({ id, name, number }) =>
      <Contact
        key={id}
        name={name}
        number={number}
        onClick={() => onDelete(id)}
      />
    )}
  </div>

export default Contacts
