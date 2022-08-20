import Contact from './Contact'

const Contacts = ({ contacts }) =>
  <div>
    {contacts.map(({name, number}) =>
      <Contact key={name} name={name} number={number} />
    )}
  </div>

export default Contacts
