'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch(
        'https://m700cgw4d2.execute-api.us-east-1.amazonaws.com/default/handleContactForm/handleContactForm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data?.message ?? 'Message sent successfully!');
    } catch (error) {
      console.error('Fetch error:', error);
      setResponse('Error: Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {response && <p>{response}</p>}
    </div>
  );
}
