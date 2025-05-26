import React from 'react';

function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:1645/auth/google?prompt=select_account';
  };

  return (
    <button onClick={handleLogin}>
      התחברי עם גוגל
    </button>
  );
}

export default GoogleLoginButton;