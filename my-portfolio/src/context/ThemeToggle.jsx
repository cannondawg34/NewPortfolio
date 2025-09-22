import { useTheme } from "../context/ThemeContext.jsx";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  console.log("ThemeToggle loaded:", theme); // ✅ inside function, theme exists

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}

export default ThemeToggle;
