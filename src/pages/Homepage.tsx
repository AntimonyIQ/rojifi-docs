import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Background Decoration (Grid Pattern) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#c7d2fe,transparent)]"></div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16 lg:pt-32">
        <div className="max-w-6xl mx-auto">
          {/* --- HERO SECTION --- */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
            {/* Left: Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Announcement Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-8 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                v2.0 is now live
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
                Build faster with the <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0C4592] to-[#0C4592]">
                  Rojifi REST API
                </span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Seamlessly integrate financial services into your application.
                Our API provides the building blocks for payments, wallets, and
                identity verification.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#0C4592] border border-transparent rounded-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  Read the Docs
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  View Reference
                </a>
              </div>
            </div>

            {/* Right: Code Visual (The "Developer Polish") */}
            <div className="flex-1 w-full max-w-lg lg:max-w-xl relative group">
              {/* Glow Effect behind code */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative rounded-xl bg-slate-900 shadow-2xl overflow-hidden ring-1 ring-white/10">
                {/* Window Controls */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-auto text-xs text-slate-500 font-mono">
                    POST /v1/transactions
                  </div>
                </div>

                {/* Code Snippet */}
                <div className="p-6 overflow-x-auto">
                  <pre className="font-mono text-sm leading-relaxed">
                    <code className="text-slate-300">
                      <span className="text-violet-400">curl</span>{" "}
                      https://api.rojifi.com/v1/pay \<br />
                      &nbsp;&nbsp;-H{" "}
                      <span className="text-green-400">
                        "Authorization: Bearer sk_test..."
                      </span>{" "}
                      \<br />
                      &nbsp;&nbsp;-d{" "}
                      <span className="text-yellow-300">{"{"}</span>
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-indigo-300">"amount"</span>:{" "}
                      <span className="text-blue-300">5000</span>,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-indigo-300">"currency"</span>:{" "}
                      <span className="text-green-400">"NGN"</span>,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-indigo-300">"reference"</span>:{" "}
                      <span className="text-green-400">"ref_123456"</span>
                      <br />
                      &nbsp;&nbsp;<span className="text-yellow-300">{"}"}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* --- FEATURES GRID --- */}
          <div id="features" className="border-t border-slate-200 pt-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Everything you need to build
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Designed for developers, optimized for business.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Lightning Fast
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Engineered for low latency. Our API responds in milliseconds,
                  ensuring your users never wait.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Developer First
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Typed SDKs, comprehensive guides, and a Postman collection to
                  get you started in minutes.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Bank-Grade Security
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  We are ISO 27001 certified. All data is encrypted at rest and
                  in transit with TLS 1.3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
