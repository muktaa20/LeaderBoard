// App.jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', country: '', score: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPlayer = () => {
    if (!form.firstName || !form.lastName || !form.country || !form.score) return alert("Please fill all fields");
    // 1. Get current time in milliseconds (used as unique ID)
const id = Date.now();

// 2. Create full name
const name = form.firstName + " " + form.lastName;

// 3. Get selected country
const country = form.country;

// 4. Convert score (string) to a number
const score = parseInt(form.score);

// 5. Create the new player object
const newPlayer = {
  id: id,
  name: name,
  country: country,
  score: score
};

    setPlayers([...players, newPlayer]);
    setForm({ firstName: '', lastName: '', country: '', score: '' });
  };

  const increaseScore = (id) => {
    setPlayers(players.map(player => player.id === id ? { ...player, score: player.score + 1 } : player));
  };

  const decreaseScore = (id) => {
    setPlayers(players.map(player => player.id === id ? { ...player, score: player.score - 1 } : player));
  };

  const deletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  return (
    <div className="container">
      <h1>🏆Leaderboard🏆</h1>
      <div className="form">
        <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
        <select name="country" value={form.country} onChange={handleChange}>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
        </select>
        <input type="number" name="score" placeholder="Score" value={form.score} onChange={handleChange} />
        <button className="add-btn" onClick={handleAddPlayer}>Add Player</button>
      </div>

      <div className="leaderboard">
        <div className="header">
          <span>Name</span>
          <span>Country</span>
          <span>Score</span>
          <span></span>
        </div>
        {players.map(player => (
          <div className="player" key={player.id}>
            <span>{player.name}</span>
            <span>{player.country}</span>
            <span>{player.score}</span>
            <span className="actions">
              <button className="plus" onClick={() => increaseScore(player.id)}>+1</button>
              <button className="minus" onClick={() => decreaseScore(player.id)}>-1</button>
              <button className="delete" onClick={() => deletePlayer(player.id)}>🚫</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
