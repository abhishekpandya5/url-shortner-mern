import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { logoutUser } from "../api/user.api";

const NavBar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      console.log("NavBar: Starting logout process");
      await logoutUser();
      console.log("NavBar: API logout successful, dispatching Redux logout");
      dispatch(logout());
      console.log("NavBar: Redux logout dispatched");

      // Only navigate if not already on homepage to avoid re-triggering auth check
      if (location.pathname !== "/") {
        console.log("NavBar: Navigating to home");
        navigate({ to: "/" });
      } else {
        console.log("NavBar: Already on homepage, skipping navigation");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Still dispatch logout to clear local state even if API call fails
      console.log(
        "NavBar: API logout failed, but still dispatching Redux logout"
      );
      dispatch(logout());

      // Only navigate if not already on homepage
      if (location.pathname !== "/") {
        navigate({ to: "/" });
      }
    }
  };

  return (
    <nav className="bg-white border border-b-black">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              URL Shortener
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
