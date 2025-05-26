import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const email = sessionStorage.getItem("userEmail");
  
  if (!email) {
  console.log("hii");
  
    // משתמש לא מחובר — הפנייה להתחברות
    return <Navigate to="/" replace />;
  }
  
  return children;
}
export default PrivateRoute;
