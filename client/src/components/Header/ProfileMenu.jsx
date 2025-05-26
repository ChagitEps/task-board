// ProfileMenu.tsx
import React, { useState } from 'react';

const ProfileMenu = ({ name, picture }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = "/logout"; // נניח שיש לך מסלול כזה בשרת
  };

  const handleSwitchUser = () => {
    window.location.href = "/auth/google"; // התחברות מחדש
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={picture}
        alt="profile"
        onClick={() => setOpen(!open)}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />
      {open && (
        <div style={{
          position: "absolute",
          top: 50,
          right: 0,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "10px",
          borderRadius: "8px",
          zIndex: 10,
        }}>
          <div style={{ marginBottom: 10 }}>{name}</div>
          <button onClick={handleLogout} style={{ display: "block", marginBottom: 5 }}>
            יציאה
          </button>
          <button onClick={handleSwitchUser}>
            החלפת משתמש
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
