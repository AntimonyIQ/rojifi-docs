function Examples() {
  return (
    <div className="prose prose-indigo max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Code Examples</h1>
      
      <p className="text-gray-600 mb-6">
        Here are some examples to help you get started with the Rojifi API in different programming languages.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">JavaScript / Node.js</h2>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6 overflow-x-auto">
        <pre className="text-sm">
{`// Using fetch API
const apiKey = 'YOUR_API_KEY';

async function getUsers() {
  try {
    const response = await fetch('https://api.rojifi.com/v1/users', {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getUsers();`}
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Python</h2>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6 overflow-x-auto">
        <pre className="text-sm">
{`import requests

api_key = 'YOUR_API_KEY'
url = 'https://api.rojifi.com/v1/users'

headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Error: {response.status_code}')`}
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">cURL</h2>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6 overflow-x-auto">
        <pre className="text-sm">
{`curl -X GET https://api.rojifi.com/v1/users \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Creating a User (POST Request)</h2>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6 overflow-x-auto">
        <pre className="text-sm">
{`// JavaScript
const createUser = async () => {
  const response = await fetch('https://api.rojifi.com/v1/users', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com'
    })
  });
  
  const data = await response.json();
  return data;
};`}
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Error Handling Example</h2>
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6 overflow-x-auto">
        <pre className="text-sm">
{`async function apiRequest(endpoint) {
  try {
    const response = await fetch(\`https://api.rojifi.com/v1/\${endpoint}\`, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}`}
        </pre>
      </div>
    </div>
  );
}

export default Examples;
