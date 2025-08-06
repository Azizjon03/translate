import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => (
  <div style={{ maxWidth: 500, margin: "auto", padding: 24 }}>
    <h2>404 - Sahifa topilmadi</h2>
    <p>Uzr, bunday sahifa mavjud emas.</p>
    <Link to="/">Bosh sahifaga qaytish</Link>
  </div>
);

export default NotFoundPage;