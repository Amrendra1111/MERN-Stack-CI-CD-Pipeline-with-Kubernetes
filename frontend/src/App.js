import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to track error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear error message before submission
    try {
      await axios.post('http://localhost:5000/api/user', { name, email, age });
      alert('User saved successfully!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data); // Set the error message
      } else {
        setErrorMessage('Error saving user');
      }
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default App;
