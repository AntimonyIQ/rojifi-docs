import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// --- Types ---
interface SubNav {
  name: string;
  href: string;
}

interface NavigationItem {
  title: string;
  items: SubNav[];
}

// --- Data ---
const navigation: NavigationItem[] = [
  {
    title: "Customer Onboarding",
    items: [
      {
        name: "Generate onboarding link for a customer",
        href: "/docs/onboarding",
      },
      { name: "Create new customer", href: "/docs/customers" },
      { name: "Get all customers", href: "/docs/customers" },
      { name: "Update a single customer", href: "/docs/quickstart" },
      { name: "Delete a single customer", href: "/docs/quickstart" },
      { name: "Get a single customer", href: "/docs/quickstart" },
    ],
  },
  {
    title: "AssociatedPersons",
    items: [
      // { name: "Accept Payments", href: "/docs/payments" },
      // { name: "Recurring Billing", href: "/docs/recurring" },
      // { name: "Refunds", href: "/docs/refunds" },
    ],
  },
  {
    title: "AssociatedEntities",
    items: [
      // { name: "Authentication", href: "/docs/api/auth" },
      // { name: "Errors", href: "/docs/api/errors" },
      // { name: "Rate Limits", href: "/docs/api/limits" },
    ],
  },
  {
    title: "Documents",
    items: [
      { name: "Complete customer creation request", href: "/docs/api/auth" },
      // { name: "Errors", href: "/docs/api/errors" },
      // { name: "Rate Limits", href: "/docs/api/limits" },
    ],
  },
  {
    title: "Wallets",
    items: [
      // { name: "Authentication", href: "/docs/api/auth" },
      // { name: "Errors", href: "/docs/api/errors" },
      // { name: "Rate Limits", href: "/docs/api/limits" },
    ],
  },
  {
    title: "Transfer",
    items: [
      // { name: "Authentication", href: "/docs/api/auth" },
      // { name: "Errors", href: "/docs/api/errors" },
      // { name: "Rate Limits", href: "/docs/api/limits" },
    ],
  },
  {
    title: "External Accounts",
    items: [
      // { name: "Authentication", href: "/docs/api/auth" },
      // { name: "Errors", href: "/docs/api/errors" },
      // { name: "Rate Limits", href: "/docs/api/limits" },
    ],
  },
  {
    title: "Current Tenant",
    items: [
      // { name: "Authentication", href: "/docs/api/auth" },
      // { name: "Errors", href: "/docs/api/errors" },
      // { name: "Rate Limits", href: "/docs/api/limits" },
    ],
  },
  {
    title: "Exchange Rate",
    items: [
      // { name: "Authentication", href: "/docs/api/auth" },
      // { name: "Errors", href: "/docs/api/errors" },
      // { name: "Rate Limits", href: "/docs/api/limits" },
    ],
  },
  {
    title: "Lists",
    items: [
      // { name: "Authentication", href: "/docs/api/auth" },
      // { name: "Errors", href: "/docs/api/errors" },
      // { name: "Rate Limits", href: "/docs/api/limits" },
    ],
  },
  {
    title: "Transactions",
    items: [
      // { name: "Authentication", href: "/docs/api/auth" },
      // { name: "Errors", href: "/docs/api/errors" },
      // { name: "Rate Limits", href: "/docs/api/limits" },
    ],
  },
  {
    title: "Simulations",
    items: [
      // { name: "Authentication", href: "/docs/api/auth" },
      // { name: "Errors", href: "/docs/api/errors" },
      // { name: "Rate Limits", href: "/docs/api/limits" },
    ],
  },
];

const topNav = [
  { name: "Home", href: "https://www.rojifi.com" },
  { name: "Docs", href: "/docs" },
  { name: "API", href: "/docs/endpoints" },
  //{ name: "Support", href: "/support" },
];

// --- Component ---
function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setSidebarOpen(false);
    if (window.location.pathname.includes("/docs")) {
      setHeaderTitle("Docs");
    }
    if (window.location.pathname.includes("/api")) {
      setHeaderTitle("Docs");
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. Header (Sticky, simple, full width) */}
      <header className="sticky top-0 z-50 w-full bg-white xl:pt-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
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
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <a href="https://www.rojifi.com" className="flex items-center gap-2">
                {/* Replace with your Logo */}
                <img
                  src="https://www.rojifi.com/logo.png"
                  className="w-8 h-8"
                />
                {/* <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                  R
                </div> */}
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  {headerTitle}
                </span>
              </a>
            </div>

            {/* Middle: Top Navigation (Desktop) */}
            <div className="hidden lg:flex items-center w-[50%] bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
              <svg
                className="w-4 h-4 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400"
              />
              <span className="text-xs text-gray-400 border border-gray-200 rounded px-1 ml-2">
                /
              </span>
            </div>

            {/* Right: Search + CTA */}
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-8">
                {topNav.map((item) => (
                  item.href.startsWith('http') ? (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium transition-colors text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ) : (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          `text-sm font-medium transition-colors ${isActive
                            ? "text-[#0C4592]"
                            : "text-gray-500 hover:text-gray-900"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    )
                ))}
              </nav>
              <a
                href="https://dashboard.rojifi.com"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#0C4592] rounded-md hover:bg-slate-800 transition-colors"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Layout Container (Max width 1440px) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start pt-8">
        {/* --- LEFT SIDEBAR (Navigation) --- */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 custom-scrollbar">
          <nav className="space-y-8 pb-10">
            {navigation.map((section) => (
              <div key={section.title}>
                <h5 className="mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h5>
                <ul className="space-y-1 ml-3">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `block py-1.5 text-sm transition-colors ${
                            isActive
                              ? "text-[#0C4592] font-semibold translate-x-1"
                              : "text-gray-600 hover:text-gray-900 hover:translate-x-1"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* --- CENTER CONTENT --- */}
        <main className="flex-1 min-w-0 lg:px-12 xl:px-16 pb-20">
          {/* Breadcrumb or Title Area could go here */}
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h1:tracking-tight prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
            <Outlet />
          </div>
        </main>

        {/* --- RIGHT SIDEBAR (On This Page) --- */}
        <aside className="hidden xl:block w-64 shrink-0 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pl-4">
          <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-2 border-transparent pl-3">
            On this page
          </h5>
          <ul className="space-y-3 text-sm border-l border-gray-100">
            {/* Ideally, you generate this dynamically from your content headings.
                   For now, this is static markup structure.
                */}
            <li>
              <a
                href="/"
                className="block text-gray-500 hover:text-indigo-600 pl-3 border-l-2 border-transparent hover:border-indigo-600 -ml-[1px]"
              >
                Getting Started
              </a>
            </li>
            <li>
              <a
                href="#integration"
                className="block text-gray-500 hover:text-indigo-600 pl-3 border-l-2 border-transparent hover:border-indigo-600 -ml-[1px]"
              >
                Integration Steps
              </a>
            </li>
            <li>
              <a
                href="#webhooks"
                className="block text-gray-500 hover:text-indigo-600 pl-3 border-l-2 border-transparent hover:border-indigo-600 -ml-[1px]"
              >
                Webhooks
              </a>
            </li>
            <li>
              <a
                href="#testing"
                className="block text-gray-500 hover:text-indigo-600 pl-3 border-l-2 border-transparent hover:border-indigo-600 -ml-[1px]"
              >
                Testing
              </a>
            </li>
          </ul>
        </aside>
      </div>

      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl transform transition-transform p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-xl">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Nav Content */}
            <nav className="space-y-8">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h5 className="mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {section.title}
                  </h5>
                  <ul className="space-y-2 ml-3">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            `block text-base ${
                              isActive
                                ? "text-indigo-600 font-semibold"
                                : "text-gray-600"
                            }`
                          }
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocsLayout;
