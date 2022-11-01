import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch(`http://localhost:5000/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(data)
      })
      .catch(err => console.error(err))

    form.reset();
  }
  // console.log(users)

  return (
    <div className="App">

      <form onSubmit={handleSubmit} style={{ marginTop: '50px' }}>
        <input type="text" name="name" id="" placeholder='name' />
        <br />
        <input type="email" name="email" id="" placeholder='email' />
        <br />
        <input type="submit" value="submit" />
      </form>

      <h1>users: {users.length}</h1>
      {
        users.map(user => <div key={user._id}>
          <p>{user.name}: {user.email}</p>
        </div>)
      }
    </div>
  );
}

export default App;
