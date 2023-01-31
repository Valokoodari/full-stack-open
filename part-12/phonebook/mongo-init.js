db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'phonebook',
    },
  ],
});

db.createCollection('contacts');

db.contacts.insert({ name: 'Arto Hellas', number: '040-123456' })
db.contacts.insert({ name: 'Ada Lovelace', number: '53235323' })
