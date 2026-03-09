import React from 'react';

export default function ErrorState({ message }) {
  return (
    <div className="error-state">
      <h2>😕 Oops!</h2>
      <p>{message}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
}