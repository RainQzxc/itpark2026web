export const Card = ({ title, children }) => (
  <div className="settings-card">
    {title && <h2>{title}</h2>}
    {children}
  </div>
);

export const Input = ({ label, ...props }) => (
  <div className="input-group">
    <label>{label}</label>
    <input {...props} />
  </div>
);

export const Button = ({ children, onClick, loading }) => (
  <button className="save-btn" onClick={onClick} disabled={loading}>
    {loading ? "Түр хүлээнэ үү..." : children}
  </button>
);