import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import "./index.css";

function App() {
  const [page, setPage] = useState("splash");
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light"); // Default to light theme as requested

  // Synchronize CSS class with state
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLoginSuccess = (username) => {
    setUser(username);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  switch (page) {
    case "splash":
      return <SplashScreen onFinish={() => setPage("login")} />;
    case "login":
      return (
        <Login
          onLogin={handleLoginSuccess}
          onForgotPassword={() => setPage("forgot_password")}
        />
      );
    case "forgot_password":
      return <ForgotPassword onBack={() => setPage("login")} />;
    case "dashboard":
      return (
        <Dashboard
          currentUser={user}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      );
    default:
      return <SplashScreen onFinish={() => setPage("login")} />;
  }
}

export default App;