// GoogleSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function GoogleSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(searchParams);
    
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const picture = searchParams.get("picture");

    if (email) {
      // כאן את יכולה לשמור ב־localStorage או ב־context
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userName", name);
        sessionStorage.setItem("userPicture", picture);

      navigate("/home"); // הפנייה הביתה
    }
  }, []);

  return <div>מתחברת...</div>;
}

export default GoogleSuccess;
