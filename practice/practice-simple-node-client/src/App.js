import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5001/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }

    fetch(`http://localhost:5001/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers)
        console.log(data)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="App" style={{ marginTop: '50px' }}>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" placeholder='User Name' />
        <br />
        <input type="email" name="email" id="" placeholder='User Email Address' />
        <br />
        <input type="submit" value="Submit" />
      </form>

      {
        users.map(usr => <p key={usr._id}>{usr.name}: {usr.email}</p>)
      }
    </div>
  );
}

export default App;
