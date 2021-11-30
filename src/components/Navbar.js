import "./Navbar.css";
import Temple from "../assets/temple.png";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="AirTask logo" />
          <span>AirTask</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Sign out
              </button>
            )}
            {isPending && (
              <button className="btn" onClick={logout}>
                Sign out
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
