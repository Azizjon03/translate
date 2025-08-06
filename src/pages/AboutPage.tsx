import React from "react";

const AboutPage: React.FC = () => (
  <div style={{ maxWidth: 500, margin: "auto", padding: 24 }}>
    <h2>Loyiha haqida</h2>
    <p>
      Bu loyiha React va bepul LibreTranslate API yordamida real vaqtda matnlarni turli tillarga tarjima qilish uchun mo‘ljallangan.
    </p>
    <p>
      Foydalanish uchun matnni kiriting, tilni tanlang va natijani darhol ko‘ring. Loyiha ochiq manbali va bepul.
    </p>
    <p>
      <a href="https://libretranslate.com/" target="_blank" rel="noopener noreferrer">
        LibreTranslate API
      </a> dan foydalaniladi.
    </p>
  </div>
);

export default AboutPage;