import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Terminal, ShieldCheck, ArrowRight, Code, Server, Globe } from "lucide-react";
import D3Network from "../components/D3Network";
import { motion } from "framer-motion";

function Homepage() {

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Payments",
      desc: "Accept payments from anywhere with a single, unified API integration."
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Developer First",
      desc: "Designed for developers. Typed SDKs, clear documentation, and easy testing."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Secure by Default",
      desc: "PCI-DSS Level 1 compliant. Fraud detection and data encryption built-in."
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "99.99% Uptime",
      desc: "Reliable infrastructure that scales with your business automatically."
    }
  ];

  return (
    <MainLayout>
      <div className="relative isolate overflow-hidden">
        {/* D3 Background Animation */}
        <D3Network />

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-sm leading-6 text-slate-600 dark:text-slate-400 mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2"></span>
                Introducing API  v2.0
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 font-display">
                Financial infra for <br />
                <span className="text-brand-600 dark:text-brand-400">internet scale</span>.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400 max-w-xl">
                Rojifi provides the building blocks for modern financial applications.
                Accept payments, manage identity, and scale your business with a developer-first API.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/docs"
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-brand-600 dark:bg-brand-500 border border-transparent rounded hover:bg-brand-700 dark:hover:bg-brand-400 transition-all duration-200"
                >
                  Start Building
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/docs/endpoints"
                  className="text-sm font-semibold leading-6 text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  View API Reference <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-none overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-transparent"></span>
                    <span className="flex h-3 w-3 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-transparent"></span>
                    <span className="flex h-3 w-3 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-transparent"></span>
                  </div>
                  <div className="text-xs font-mono text-slate-500">create-payment.js</div>
                </div>
                <div className="p-6 overflow-x-auto bg-white dark:bg-slate-950">
                  <pre className="text-sm font-mono leading-relaxed">
                    <code className="language-javascript">
                      <span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">rojifi</span> = <span className="text-purple-600 dark:text-purple-400">require</span>(<span className="text-green-600 dark:text-green-400">'rojifi'</span>)(<span className="text-green-600 dark:text-green-400">'sk_test_...'</span>);{"\n\n"}
                      <span className="text-slate-500 dark:text-slate-400">// Create a payment intent</span>{"\n"}
                      <span className="text-purple-600 dark:text-purple-400">const</span> payment = <span className="text-purple-600 dark:text-purple-400">await</span> rofiji.paymentIntents.<span className="text-yellow-600 dark:text-yellow-400">create</span>({"{"}{"\n"}
                      {"  "}amount: <span className="text-orange-600 dark:text-orange-400">2000</span>,{"\n"}
                      {"  "}currency: <span className="text-green-600 dark:text-green-400">'usd'</span>,{"\n"}
                      {"  "}payment_method_types: [<span className="text-green-600 dark:text-green-400">'card'</span>],{"\n"}
                      {"}"});
                    </code>
                  </pre>
                </div>
              </div>
              {/* Decorative elements behind code block */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900/50"></div>
            </motion.div>
            </div>
        </div>
      </div>

      {/* Stats Section - Clean Grid */}
      <div className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <dl className="grid grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 sm:grid-cols-4">
            <div className="bg-white dark:bg-slate-950 p-6 sm:p-10">
              <dt className="text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">Transaction Volume</dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">$10B+</dd>
            </div>
            <div className="bg-white dark:bg-slate-950 p-6 sm:p-10">
              <dt className="text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">Uptime SLA</dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">99.99%</dd>
            </div>
            <div className="bg-white dark:bg-slate-950 p-6 sm:p-10">
              <dt className="text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">Global Reach</dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">135+</dd>
            </div>
            <div className="bg-white dark:bg-slate-950 p-6 sm:p-10">
              <dt className="text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">latency</dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">&lt;80ms</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950" id="features">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-brand-600 dark:text-brand-400">Build faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Everything you need to scale</p>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              A complete financial stack, designed from the ground up to be the best way to move money on the internet.
            </p>
            </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded hover:border-brand-500 dark:hover:border-brand-500 transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded bg-slate-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 mb-6 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-center">
                  <div className="font-mono text-xl font-bold mb-2">REST</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">API</div>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-center">
                  <div className="font-mono text-xl font-bold mb-2">GraphQL</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">Support</div>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-center">
                  <div className="font-mono text-xl font-bold mb-2">Webhooks</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">Real-time</div>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-center">
                  <div className="font-mono text-xl font-bold mb-2">SDKs</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">Ranked #1</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-6">
                Integration made simple
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Whether you prefer REST or GraphQL, Python or Node.js, we have you covered.
                Our libraries are typed, tested, and actively maintained.
              </p>
              <ul className="space-y-4">
                {[
                  "Idempotency keys for safe retries",
                  "Webhooks with signature verification",
                  "Predictable versioning",
                  "Comprehensive error messages"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700 dark:text-slate-300">
                    <div className="mr-3 p-1 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                      <Code className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        {/* Modern Background with Gradients and Grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[20%] w-[100%] h-[100%] rounded-full bg-brand-500/20 blur-[120px]"></div>
          <div className="absolute top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-blue-600/20 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl mb-6">Ready to launch?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Join the thousands of developers who are building the future of finance with Rojifi.
            Get your API keys in less than 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/docs/signup" className="px-8 py-3 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded transition-colors">
              Get API Keys
            </Link>
            <Link to="/docs" className="px-8 py-3 bg-transparent border border-white/20 hover:bg-white/10 text-white font-semibold rounded transition-colors">
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

    </MainLayout>
  );
}

export default Homepage;
