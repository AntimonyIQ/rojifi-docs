function Errors() {
  return (
    <div className="prose prose-indigo max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Error Handling</h1>
      
      <p className="text-gray-600 mb-6">
        The Rojifi API uses conventional HTTP response codes to indicate the success or failure of an API request.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">HTTP Status Codes</h2>
      
      <div className="space-y-4 mb-8">
        <div className="border-l-4 border-green-500 bg-green-50 p-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-green-800">200 - OK</span>
          </div>
          <p className="text-green-700">Everything worked as expected.</p>
        </div>

        <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-yellow-800">400 - Bad Request</span>
          </div>
          <p className="text-yellow-700">The request was unacceptable, often due to missing a required parameter.</p>
        </div>

        <div className="border-l-4 border-red-500 bg-red-50 p-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-red-800">401 - Unauthorized</span>
          </div>
          <p className="text-red-700">No valid API key provided.</p>
        </div>

        <div className="border-l-4 border-red-500 bg-red-50 p-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-red-800">403 - Forbidden</span>
          </div>
          <p className="text-red-700">The API key doesn't have permissions to perform the request.</p>
        </div>

        <div className="border-l-4 border-red-500 bg-red-50 p-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-red-800">404 - Not Found</span>
          </div>
          <p className="text-red-700">The requested resource doesn't exist.</p>
        </div>

        <div className="border-l-4 border-red-500 bg-red-50 p-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-red-800">429 - Too Many Requests</span>
          </div>
          <p className="text-red-700">Too many requests hit the API too quickly.</p>
        </div>

        <div className="border-l-4 border-red-500 bg-red-50 p-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-red-800">500 - Internal Server Error</span>
          </div>
          <p className="text-red-700">Something went wrong on our end.</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Error Response Format</h2>
      <p className="text-gray-600 mb-4">
        All errors return a JSON response with the following structure:
      </p>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6">
        <pre className="text-sm">
{`{
  "status": "error",
  "message": "A human-readable error message",
  "code": "ERROR_CODE",
  "details": {
    // Additional error details (optional)
  }
}`}
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Example Error Response</h2>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6">
        <pre className="text-sm">
{`{
  "status": "error",
  "message": "Invalid API key provided",
  "code": "INVALID_API_KEY"
}`}
        </pre>
      </div>
    </div>
  );
}

export default Errors;
