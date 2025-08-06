import React, { useState, useEffect } from "react";
import { api } from "./util/setting";

type Language = {
  code: string;
  name: string;
};

const LANGUAGES: Language[] = [
  { code: "auto", name: "Aniqlansin" },
  { code: "uz", name: "Uzbek" },
  { code: "en", name: "English" },
  { code: "tr", name: "Turkish" },
  { code: "ru", name: "Russian" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
];

const HomePage: React.FC = () => {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [from, setFrom] = useState("uz");
  const [to, setTo] = useState("en");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const timeout = setTimeout(() => {
      if (text.trim()) {
        handleTranslate();
      } else {
        setTranslated("");
      }
    }, 700);

    return () => clearTimeout(timeout);

  }, [text, from, to]);

  const handleTranslate = async () => {
    try {
      setLoading(true);
      const response = await api.post("/language/translate/v2", {
        q: text,
        source: from,
        target: to,
        format: "text",
      });

      const result = response.data.data.translations.translatedText[0];
      setTranslated(result);
    } catch (err) {
      console.error("Tarjima xatosi:", err);
      setTranslated("❌ Tarjima amalga oshmadi");
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    if (from === "auto") return;
    setFrom(to);
    setTo(from);
    setText(translated);
    setTranslated(text);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">Tarjima</h1>

        {/* Language Selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm focus:ring-blue-500 focus:outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={swapLanguages}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            title="Tillarni almashtirish"
          >
            🔁
          </button>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm focus:ring-blue-500 focus:outline-none"
          >
            {LANGUAGES.filter(l => l.code !== "auto").map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Textareas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input */}
          <div className="bg-white border rounded-lg shadow-sm p-4 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tarjima qilinadigan matn..."
              className="w-full h-64 p-3 resize-none outline-none text-base text-gray-800"
              maxLength={5000}
            />
            {text && (
              <button
                onClick={() => setText("")}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                title="Tozalash"
              >
                ❌
              </button>
            )}
            <div className="text-sm text-gray-500 mt-2 text-right">{text.length}/5000</div>
          </div>

          {/* Output */}
          <div className="bg-white border rounded-lg shadow-sm p-4 relative">
            <div className="w-full h-64 p-3 text-base text-gray-800 overflow-y-auto whitespace-pre-wrap bg-gray-50 rounded-md border">
              {loading ? "⏳ Tarjima qilinmoqda..." : translated || "Tarjima bu yerda paydo bo‘ladi..."}
            </div>
            {translated && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => setTranslated("")}
                  className="text-gray-400 hover:text-red-500"
                  title="Tozalash"
                >
                  ❌
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(translated)}
                  className="text-gray-400 hover:text-green-500"
                  title="Nusxa olish"
                >
                  📋
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          ✨ Tezkor va avtomatik tarjima sahifasi — matn kiriting va natijani darhol ko‘ring!
        </div>
      </div>
    </div>
  );
};

export default HomePage;
