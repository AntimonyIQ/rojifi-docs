function RateLimits() {
  return (
    <div className="prose prose-indigo max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Rate Limits</h1>
      
      <p className="text-gray-600 mb-6">
        The Rojifi API implements rate limiting to ensure fair usage and maintain service quality for all users.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-700">
          <strong>Default Limit:</strong> 1000 requests per hour per API key
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Rate Limit Headers</h2>
      <p className="text-gray-600 mb-4">
        Each API response includes headers that provide information about your rate limit status:
      </p>
      
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6">
        <pre className="text-sm">
{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1234567890`}
        </pre>
      </div>

      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
        <li><code className="text-sm bg-gray-100 px-2 py-1 rounded">X-RateLimit-Limit</code>: The maximum number of requests you can make per hour</li>
        <li><code className="text-sm bg-gray-100 px-2 py-1 rounded">X-RateLimit-Remaining</code>: The number of requests remaining in the current rate limit window</li>
        <li><code className="text-sm bg-gray-100 px-2 py-1 rounded">X-RateLimit-Reset</code>: The time at which the current rate limit window resets (Unix timestamp)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Exceeding Rate Limits</h2>
      <p className="text-gray-600 mb-4">
        If you exceed your rate limit, you'll receive a <code className="text-sm bg-gray-100 px-2 py-1 rounded">429 Too Many Requests</code> response:
      </p>
      
      <div className="bg-gray-800 text-white p-4 rounded-md mb-6">
        <pre className="text-sm">
{`{
  "status": "error",
  "message": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "details": {
    "retry_after": 3600
  }
}`}
        </pre>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Best Practices</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
        <li>Monitor rate limit headers in your responses</li>
        <li>Implement exponential backoff for retries</li>
        <li>Cache responses when possible to reduce API calls</li>
        <li>Batch requests when the API supports it</li>
        <li>Consider upgrading your plan for higher rate limits</li>
      </ul>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="text-yellow-700">
          <strong>Need Higher Limits?</strong> Contact us to discuss enterprise plans with custom rate limits.
        </p>
      </div>
    </div>
  );
}

export default RateLimits;
