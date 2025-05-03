'use client'
import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('https://ugpq6efle4.execute-api.eu-north-1.amazonaws.com/default/handleContactForm/handleContactForm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}
