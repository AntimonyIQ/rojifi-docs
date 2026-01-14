function GettingStarted() {
  return (
    <div className="prose prose-indigo max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Getting Started</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-700">
          Welcome to the Rojifi REST API! This guide will help you get started
          with integrating our API into your application.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Base URL
      </h2>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6">
        <code>https://api.rojifi.com/v1</code>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Quick Start
      </h2>
      <p className="text-gray-600 mb-4">
        To start using the Rojifi API, you'll need to:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
        <li>
          Sign up for an account at{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            rojifi.com
          </a>
        </li>
        <li>Generate an API key from your dashboard</li>
        <li>Include the API key in your request headers</li>
        <li>Make your first API call</li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Example Request
      </h2>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6 overflow-x-auto">
        <pre className="text-sm">
          {`curl -X GET https://api.rojifi.com/v1/data \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Response Format
      </h2>
      <p className="text-gray-600 mb-4">
        All API responses are returned in JSON format:
      </p>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6">
        <pre className="text-sm">
          {`{
  "status": "success",
  "data": {
    // Response data here
  }
}`}
        </pre>
      </div>
    </div>
  );
}

export default GettingStarted;
