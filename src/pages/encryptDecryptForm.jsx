import React, { useState } from "react";
import axios from "axios";

const EncryptDecryptForm = () => {
  const [salt, setSalt] = useState("");
  const [value, setValue] = useState("");
  const [action, setAction] = useState("encrypt");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");
    setCopied(false);
    try {
      const response = await axios.post("/encrypt-decrypt", {
        enc_salt: salt,
        value: value,
        action: action,
      });
      setResult(response.data.result);
    } catch (err) {
      if (err.response) {
        setError(
          `Error ${err.response.status}: ${
            err.response.data?.message || JSON.stringify(err.response.data)
          }`
        );
      } else if (err.request) {
        setError("Tidak ada respons dari server.");
      } else {
        setError("Terjadi error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg mx-2">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Encrypt/Decrypt Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1 text-gray-200">
              Salt:
            </label>
            <input
              type="text"
              className="w-full border border-gray-700 rounded px-3 py-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
              required
              placeholder="Masukkan salt"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-200">
              Value:
            </label>
            <input
              type="text"
              className="w-full border border-gray-700 rounded px-3 py-2 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              placeholder="Masukkan value"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-200">
              Action:
            </label>
            <select
              className="w-full border border-gray-700 rounded px-3 py-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              required
            >
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded font-bold transition
              ${
                loading || !salt || !value
                  ? "bg-blue-800 text-blue-100 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            `}
            disabled={loading || !salt || !value}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
        {error && (
          <div className="mt-4 text-red-400 text-center font-semibold">
            {error}
          </div>
        )}
        {result && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="w-full p-4 bg-gray-700 rounded text-green-300 font-mono text-sm overflow-x-auto select-all break-all">
              <span className="font-bold">Result:</span>
              <div className="mt-2">{result}</div>
            </div>
            <button
              onClick={handleCopy}
              className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition font-semibold"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncryptDecryptForm;