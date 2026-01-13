import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface NavigationItem {
  name: string;
  href: string;
}

function DocsLayout() {
  // Default sidebar state based on screen size
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Open sidebar by default on large screens (>= 1024px)
      setSidebarOpen(window.innerWidth >= 1024);
    };
    
    // Set initial state
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigation: NavigationItem[] = [
    { name: 'Getting Started', href: '/docs' },
    { name: 'Authentication', href: '/docs/authentication' },
    { name: 'Endpoints', href: '/docs/endpoints' },
    { name: 'Error Handling', href: '/docs/errors' },
    { name: 'Rate Limits', href: '/docs/rate-limits' },
    { name: 'Examples', href: '/docs/examples' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 p-2 rounded-md hover:bg-gray-100 lg:hidden"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <Link to="/" className="text-xl font-bold text-indigo-600">
                Rojifi API
              </Link>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link to="/docs" className="text-gray-600 hover:text-gray-900">
                Docs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:static lg:translate-x-0 w-64 h-[calc(100vh-73px)] bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out z-20`}
        >
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-2 text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DocsLayout;
