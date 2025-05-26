// // components/Header.tsx
// import React from "react";

// const Header = () => {
//   const name = sessionStorage.getItem("userName");
//   const picture = sessionStorage.getItem("userPicture");

//   const handleLogout = () => {
//     sessionStorage.clear(); // או רק sessionStorage.removeItem(...)
//     window.location.href = "/"; // מחזיר לדף ההתחברות
//   };

//   if (!name || !picture) return null; // אם אין משתמש מחובר

//   return (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", background: "#f5f5f5" }}>
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <img src={picture} alt="profile" style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 10 }} />
//         <span>{name}</span>
//       </div>
//       <button onClick={handleLogout}>יציאה</button>
//     </div>
//   );
// };

// export default Header;
import React, { useState } from "react";

const Header = () => {
  const name = sessionStorage.getItem("userName");
  const picture = sessionStorage.getItem("userPicture");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const handleSwitchUser = () => {
    sessionStorage.clear();
window.location.href = "http://localhost:1645/auth/google";
  };

  if (!name || !picture) return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "10px",
      background: "#f5f5f5",
      position: "relative"
    }}>
      <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer" }}>
        <img
          src={picture}
          alt="profile"
          title={name}
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      </div>

      {menuOpen && (
        <div style={{
          position: "absolute",
          top: 60,
          right: 10,
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          padding: "10px",
          zIndex: 999
        }}>
          <div style={{ marginBottom: 8 }}>{name}</div>
          <button onClick={handleLogout} style={{ display: "block", marginBottom: 6, width: "100%" }}>
            יציאה
          </button>
          <button onClick={handleSwitchUser} style={{ display: "block", width: "100%" }}>
            החלפת משתמש
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
