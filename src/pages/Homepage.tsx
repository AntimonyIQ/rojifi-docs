import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Rojifi REST API
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Official Documentation
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Welcome to the Rojifi REST API documentation. This comprehensive guide will help you integrate and work with our API effectively.
          </p>
          
          <div className="flex justify-center gap-4 mb-16">
            <Link
              to="/docs"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border-2 border-indigo-600"
            >
              Learn More
            </a>
          </div>

          <div id="features" className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">
                Built for performance with high availability and low latency
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Well Documented</h3>
              <p className="text-gray-600">
                Comprehensive guides, examples, and API references
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-gray-600">
                Industry-standard security practices and authentication
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
