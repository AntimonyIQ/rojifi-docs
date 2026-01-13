function Endpoints() {
  return (
    <div className="prose prose-indigo max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">API Endpoints</h1>
      
      <p className="text-gray-600 mb-6">
        This page lists all available endpoints in the Rojifi REST API.
      </p>

      {/* Users Endpoints */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Users</h2>
        
        <div className="border border-gray-200 rounded-lg mb-4">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold mr-3">GET</span>
              <code className="text-gray-800">/users</code>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-2">Retrieve a list of all users.</p>
            <div className="bg-gray-800 text-white p-3 rounded-md mt-3">
              <pre className="text-xs">
{`GET https://api.rojifi.com/v1/users`}
              </pre>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg mb-4">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold mr-3">GET</span>
              <code className="text-gray-800">/users/:id</code>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-2">Retrieve a specific user by ID.</p>
            <div className="bg-gray-800 text-white p-3 rounded-md mt-3">
              <pre className="text-xs">
{`GET https://api.rojifi.com/v1/users/123`}
              </pre>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg mb-4">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold mr-3">POST</span>
              <code className="text-gray-800">/users</code>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-2">Create a new user.</p>
            <div className="bg-gray-800 text-white p-3 rounded-md mt-3">
              <pre className="text-xs">
{`POST https://api.rojifi.com/v1/users
{
  "name": "John Doe",
  "email": "john@example.com"
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg mb-4">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex items-center">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-semibold mr-3">PUT</span>
              <code className="text-gray-800">/users/:id</code>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-2">Update an existing user.</p>
            <div className="bg-gray-800 text-white p-3 rounded-md mt-3">
              <pre className="text-xs">
{`PUT https://api.rojifi.com/v1/users/123
{
  "name": "Jane Doe"
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg mb-4">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex items-center">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-semibold mr-3">DELETE</span>
              <code className="text-gray-800">/users/:id</code>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-2">Delete a user.</p>
            <div className="bg-gray-800 text-white p-3 rounded-md mt-3">
              <pre className="text-xs">
{`DELETE https://api.rojifi.com/v1/users/123`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Data Endpoints */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Data</h2>
        
        <div className="border border-gray-200 rounded-lg mb-4">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold mr-3">GET</span>
              <code className="text-gray-800">/data</code>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-2">Retrieve data from the API.</p>
            <div className="bg-gray-800 text-white p-3 rounded-md mt-3">
              <pre className="text-xs">
{`GET https://api.rojifi.com/v1/data`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Endpoints;
