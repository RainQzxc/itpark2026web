import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext-ээс login функцийг авна

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        login(); // 1. Frontend-ийн төлөвийг "Нэвтэрсэн" болгоно
        navigate("/admin"); // 2. Админ руу үсрүүлнэ
      } else {
        setErrorMsg("❌ Нэвтрэх нэр эсвэл нууц үг буруу байна!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("❌ Сервертэй холбогдоход алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-icon">🔒</div>
        <p className="login-subtitle">Системд нэвтрэх</p>

        <form onSubmit={handleLogin}>
          <label>Хэрэглэгчийн нэр*</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Нууц үг*</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
          </button>
        </form>

        {errorMsg && (
          <p className="error" style={{ color: "#ff4d4d", marginTop: "15px", textAlign: "center", fontWeight: "bold" }}>
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;