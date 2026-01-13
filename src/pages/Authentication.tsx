function Authentication() {
  return (
    <div className="prose prose-indigo max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Authentication</h1>
      
      <p className="text-gray-600 mb-6">
        The Rojifi API uses API keys to authenticate requests. You can view and manage your API keys in the Rojifi Dashboard.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">API Keys</h2>
      <p className="text-gray-600 mb-4">
        Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
      </p>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="text-yellow-700">
          <strong>Warning:</strong> Keep your API keys secure and never expose them in client-side code or public repositories.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Using Your API Key</h2>
      <p className="text-gray-600 mb-4">
        Include your API key in the Authorization header of your requests:
      </p>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6">
        <pre className="text-sm">
{`Authorization: Bearer YOUR_API_KEY`}
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Example</h2>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6 overflow-x-auto">
        <pre className="text-sm">
{`// Using fetch in JavaScript
fetch('https://api.rojifi.com/v1/data', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data));`}
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Authentication Errors</h2>
      <p className="text-gray-600 mb-4">
        If authentication fails, you'll receive a 401 Unauthorized response:
      </p>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6">
        <pre className="text-sm">
{`{
  "status": "error",
  "message": "Invalid or missing API key",
  "code": "UNAUTHORIZED"
}`}
        </pre>
      </div>
    </div>
  );
}

export default Authentication;
