import { useState } from "react";
import axios from "axios";

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.post("http://localhost:5000/api/create", {
      url: longUrl
    });
    setShortUrl(response.data);
    setLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="longUrl"
            className="block text-sm font-semibold text-gray-700"
          >
            Destination URL
          </label>
          <div className="relative group">
            <input
              id="longUrl"
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/your-very-long-url-here"
              className={`w-full px-4 py-4 text-lg border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : longUrl && isValidUrl(longUrl)
                ? "border-green-300 focus:border-green-500 focus:ring-green-100"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
            } group-hover:border-gray-300
            `}
              required
            />
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          {loading ? (
            <div className="flex items-center justify-center relative z-10">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center justify-center relative z-10">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              Generate Short Link
            </div>
          )}
        </button>
      </div>

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-gray-600 mb-2">Your short URL:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-2 text-white text-sm rounded-md cursor-pointer ${
                copied ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UrlForm;
