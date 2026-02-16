import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Terminal, ShieldCheck, ArrowRight, Code, Server, Globe, Play, CheckCircle2, ChevronRight } from "lucide-react";
import D3Network from "../components/D3Network";
import { motion, AnimatePresence } from "framer-motion";

const CodeWindow = () => {
    const [step, setStep] = useState(0); // 0: typing, 1: ready (show button), 2: clicked (simulate click), 3: running, 4: success
    const [displayedCode, setDisplayedCode] = useState("");

    // We'll use a pre-highlighted structural representation to keep it simple while allowing typing
    // Since true syntax highlighting during typing is complex without a library, 
    // we will type out plain text but render the final version with colors once typing is done.
    // OR we can just type characters.

    // Let's stick to the previous simple typing for now, but apply colors after typing finishes?
    // No, user wants it to look like code.

    // Better approach: Static code block that is revealed character by character?
    // Actually, let's just use the colored spans from the previous version, but reveal them.
    // That's hard to animate character by character.

    // Compromise: Type plain text, then instantly switch to highlighted text when done typing? 
    // Or just highlight keywords using regex replacement on the displayed string.

    const plainCode = `const rojifi = require('rojifi')('sk_test_...');

// Create a payment intent
const payment = await rojifi.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  payment_method_types: ['card'],
});`;

    // More robust rendering: 
    // We will render the full colored code, but mask it based on character count.

    // Typing effect
    useEffect(() => {
        if (step !== 0) return;

        let currentIndex = 0;
        setDisplayedCode(""); // Reset code display

        const typingInterval = setInterval(() => {
            if (currentIndex <= plainCode.length) {
                setDisplayedCode(plainCode.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => setStep(1), 500); // Ready state
            }
        }, 15); // Faster typing

        return () => clearInterval(typingInterval);
    }, [step]);

    // Sequencer for the automation
    useEffect(() => {
        if (step === 1) {
            // Wait a bit, then simulate click
            const timeout = setTimeout(() => {
                setStep(2); // Click state
            }, 800);
            return () => clearTimeout(timeout);
        }
        if (step === 2) {
            // Hold click state briefly, then run
            const timeout = setTimeout(() => {
                setStep(3); // Running
            }, 300);
            return () => clearTimeout(timeout);
        }
        if (step === 3) {
            // Run duration
            const timeout = setTimeout(() => {
                setStep(4); // Success
            }, 1500);
            return () => clearTimeout(timeout);
        }
        if (step === 4) {
            // Animation loop: Reset after 4 seconds
            const timeout = setTimeout(() => {
                setStep(0);
            }, 4000);
            return () => clearTimeout(timeout);
        }
    }, [step]);

    // Quick and dirty syntax highlighting for the static code display
    // We construct the "rich" view and overlay it, or just use dangerous HTML
    // Ideally we'd use a library, but let's do a reliable manual highlight render
    const CodeLine = ({ text }: { text: string }) => {
        // Comment
        if (text.trim().startsWith("//")) {
            return <span className="text-slate-500 italic">{text}</span>;
        }

        const parts = text.split(/('.*?'|\s+|[(){}[\],.;:])/g).filter(Boolean);

        return (
            <span>
                {parts.map((part, i) => {
                    if (part === 'const' || part === 'await' || part === 'require')
                        return <span key={i} className="text-purple-400 font-semibold">{part}</span>;
                    if (part === 'rojifi' || part === 'payment' || part === 'console')
                        return <span key={i} className="text-blue-400">{part}</span>;
                    if (part === 'create' || part === 'log')
                        return <span key={i} className="text-yellow-300">{part}</span>;
                    if (part.startsWith("'"))
                        return <span key={i} className="text-green-400">{part}</span>;
                    if (!isNaN(Number(part)))
                        return <span key={i} className="text-orange-400">{part}</span>;
                    if (part.match(/[(){}[\]]/))
                        return <span key={i} className="text-yellow-600 dark:text-yellow-500">{part}</span>;
                    return <span key={i} className="text-slate-300">{part}</span>;
                })}
            </span>
        );
    };

    return (
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden min-h-[320px] flex flex-col relative">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-4 py-3">
                <div className="flex items-center space-x-2">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-red-500/80"></span>
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-500/80"></span>
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500/80"></span>
                </div>
                <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                    <Code className="w-3 h-3" />
                    payment-flow.js
                </div>
                <div className={`text-xs px-2 py-0.5 rounded transition-colors ${step >= 3 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {step === 0 ? 'Typing...' : step <= 2 ? 'Ready' : step === 3 ? 'Running...' : 'Success'}
                </div>
            </div>

            {/* Editor Body */}
            <div className="p-6 overflow-x-auto bg-[#0d1117] dark:bg-[#0d1117] flex-1 relative font-mono text-sm leading-relaxed">
                <pre className="font-mono text-sm">
                    {/* 
                        We only render properly colors when typing is nearing completion or complete to avoid complexity.
                        Actually, let's just render the "dumb" text while typing, and "smart" text fully when done?
                        Or better: Just render dumb text. The user asked for colors.
                    */}
                    {step === 0 ? (
                        <code className="text-slate-300">
                            {displayedCode}
                            <span className="animate-pulse inline-block w-2 h-4 bg-brand-500 ml-1 align-middle"></span>
                        </code>
                    ) : (
                        <code className="block">
                            <div className="leading-relaxed">
                                <CodeLine text="const rojifi = require('rojifi')('sk_test_...');" />
                                <br /><br />
                                <CodeLine text="// Create a payment intent" />
                                <br />
                                <CodeLine text="const payment = await rojifi.paymentIntents.create({" />
                                <br />
                                <span className="pl-4"><CodeLine text="amount: 2000," /></span>
                                <br />
                                <span className="pl-4"><CodeLine text="currency: 'usd'," /></span>
                                <br />
                                <span className="pl-4"><CodeLine text="payment_method_types: ['card']," /></span>
                                <br />
                                <CodeLine text="});" />
                            </div>
                        </code>
                    )}
                </pre>

                {/* Automated Run Button */}
                <AnimatePresence>
                    {(step === 1 || step === 2) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute bottom-6 right-6"
                        >
                            <motion.button
                                animate={step === 2 ? { scale: 0.95, filter: "brightness(0.9)" } : { scale: 1 }}
                                className={`flex items-center text-sm font-semibold px-4 py-2 rounded shadow-lg transition-all ${step === 2 ? 'bg-brand-700 text-white shadow-inner' : 'bg-brand-600 text-white'
                                    }`}
                            >
                                <Play className="w-4 h-4 mr-2" fill="currentColor" />
                                Run Code
                                {/* Cursor simulation */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20, y: 20 }}
                                    animate={{ opacity: 1, x: 10, y: 10 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute -bottom-4 -right-4 pointer-events-none"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" fill="black" stroke="white" />
                                    </svg>
                                </motion.div>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Terminal Drawer (Slides up) */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: step >= 3 ? '140px' : 0 }}
                className="bg-[#1e1e1e] border-t border-slate-800 overflow-hidden text-xs font-mono"
            >
                <div className="p-4 text-slate-300 space-y-2">
                    <div className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                        <span className="text-slate-100">node payment-flow.js</span>
                    </div>

                    {step >= 3 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-yellow-500"
                        >
                            ➜ Initiating payment sequence...
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-2"
                        >
                            <div className="text-slate-400">Verifying merchant credentials... OK</div>
                            <div className="flex items-center gap-2 text-green-400">
                                <CheckCircle2 className="w-3 h-3" />
                                <span className="font-bold">Payment Intent Created:</span>
                                <span className="text-slate-400">pi_3Mtw...2e</span>
                            </div>
                            <div className="text-slate-500 mt-2">✨ Process completed in 142ms</div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

// 3D Vertical Carousel Component
const Carousel3D = () => {
    const currencies = [
        { code: 'USD', flag: 'us', name: 'United States Dollar' },
        { code: 'CNY', flag: 'cn', name: 'Chinese Yuan' },
        { code: 'EUR', flag: 'eu', name: 'Euro' },
        { code: 'GBP', flag: 'gb', name: 'British Pound' },
        { code: 'AUD', flag: 'au', name: 'Australian Dollar' },
        { code: 'NZD', flag: 'nz', name: 'New Zealand Dollar' },
        { code: 'SGD', flag: 'sg', name: 'Singapore Dollar' },
        { code: 'HKD', flag: 'hk', name: 'Hong Kong Dollar' },
        { code: 'JPY', flag: 'jp', name: 'Japanese Yen' },
        { code: 'CHF', flag: 'ch', name: 'Swiss Franc' },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % currencies.length);
        }, 2000); // Change every 2 seconds
        return () => clearInterval(interval);
    }, []);

    // We want to show: previous, current, next
    // But for a smooth infinite loop, we need a window.
    // Let's render ALL of them but with absolute positioning based on distance from activeIndex.

    return (
        <div className="relative h-[240px] w-full flex items-center justify-center perspective-1000">
            {currencies.map((currency, index) => {
                // Calculate distance from active index
                // Handle wrap-around logic for distance
                let offset = index - activeIndex;
                if (offset > currencies.length / 2) offset -= currencies.length;
                if (offset < -currencies.length / 2) offset += currencies.length;

                // Only render items that are close to the center to save resources and cleaner DOM
                if (Math.abs(offset) > 2) return null;

                const isActive = offset === 0;

                return (
                    <motion.div
                        key={currency.code}
                        initial={false}
                        animate={{
                            y: offset * 70, // Vertical spacing
                            scale: isActive ? 1 : 1 - Math.abs(offset) * 0.2, // Scale down non-active
                            opacity: isActive ? 1 : 1 - Math.abs(offset) * 0.4, // Fade out non-active
                            z: isActive ? 0 : -100 * Math.abs(offset), // Push back in 3D
                            rotateX: offset * -10, // Rotate slightly
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`absolute w-64 p-4 rounded-xl border backdrop-blur-md flex items-center gap-4 transition-colors duration-500
                            ${isActive
                                ? 'bg-white dark:bg-slate-900 border-brand-200 dark:border-brand-900 shadow-xl z-20'
                                : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-sm z-10'
                            }`}
                    >
                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm flex-shrink-0 border border-slate-100 dark:border-slate-700">
                            <img
                                src={`https://flagfeed.com/flags/${currency.flag}`}
                                alt={currency.code}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <span className={`font-bold ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {currency.code}
                                </span>
                                {isActive && (
                                    <span className="text-xs font-medium text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                                        Active
                                    </span>
                                )}
                            </div>
                            <div className={`text-xs truncate ${isActive ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-600'}`}>
                                {currency.name}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

// Status Carousel Component (Similar to Global Payment Carousel but for System Status)
const StatusCarousel = () => {
    const services = [
        { name: 'All Systems Operational', type: 'summary', status: 'Operational' },
        { name: 'AI Gateway', type: 'service', status: 'Operational' },
        { name: 'API', type: 'service', status: 'Operational' },
        { name: 'Build & Deploy', type: 'service', status: 'Operational' },
        { name: 'CI/CD', type: 'service', status: 'Operational' },
        { name: 'Community', type: 'service', status: 'Operational' },
        { name: 'Cron Jobs', type: 'service', status: 'Operational' },
        { name: 'Dashboard', type: 'service', status: 'Operational' },
        { name: 'Data Cache', type: 'service', status: 'Operational' },
        { name: 'DNS', type: 'service', status: 'Operational' },
        { name: 'Domain Registration', type: 'service', status: 'Operational' },
        { name: 'Edge Functions', type: 'service', status: 'Operational' },
        { name: 'Edge Middleware', type: 'service', status: 'Operational' },
        { name: 'Edge Network', type: 'service', status: 'Operational' },
        { name: 'Firewall', type: 'service', status: 'Operational' },
        { name: 'Image Optimization', type: 'service', status: 'Operational' },
        { name: 'Logs', type: 'service', status: 'Operational' },
        { name: 'Marketplace', type: 'service', status: 'Operational' },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate the carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % services.length);
        }, 2500); // Change every 2.5 seconds
        return () => clearInterval(interval);
    }, []);

    // Generate random history bars for the visualization (90 bars)
    // We memoize this to avoid regeneration on every render, though in this simple case it's fine.
    // We'll just generate them deterministically based on name length to keep it consistent but "random"
    const getBars = (name: string) => {
        const seed = name.length;
        return Array.from({ length: 40 }).map((_, i) => {
            // Mostly operational (green), occasional "incident" (yellow/red)
            // But user asked for "Green for good, Red for bad", and "Operational".
            // Let's keep it mostly green to match "Operational" status.
            const isDown = (i + seed) % 67 === 0;
            const isDegraded = (i + seed) % 43 === 0;
            return isDown ? 'bg-red-500' : isDegraded ? 'bg-yellow-400' : 'bg-emerald-500';
        });
    };

    return (
        <div className="relative h-[320px] w-full flex items-center justify-center perspective-1000 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-transparent" /> {/* Spacer */}

            {services.map((service, index) => {
                // Calculate distance from active index for the carousel effect
                let offset = index - activeIndex;
                if (offset > services.length / 2) offset -= services.length;
                if (offset < -services.length / 2) offset += services.length;

                // Render only visible items
                if (Math.abs(offset) > 2) return null;

                const isActive = offset === 0;
                const isSummary = service.type === 'summary';

                return (
                    <motion.div
                        key={service.name}
                        initial={false}
                        animate={{
                            y: offset * 85, // Vertical spacing
                            scale: isActive ? 1 : 1 - Math.abs(offset) * 0.1,
                            opacity: isActive ? 1 : 0.6 - Math.abs(offset) * 0.2,
                            z: isActive ? 0 : -100 * Math.abs(offset),
                            rotateX: offset * -15,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`absolute w-[90%] md:w-[400px] rounded-xl border backdrop-blur-md transition-colors duration-500 flex flex-col p-5
                            ${isActive
                                ? 'bg-white dark:bg-slate-900 border-brand-200 dark:border-brand-900 shadow-2xl z-20'
                                : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-lg z-10'
                            }`}
                    >
                        {/* Summary Card Design */}
                        {isSummary ? (
                            <div className="flex flex-col items-center justify-center text-center h-full gap-2 py-2">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-1">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-emerald-600 dark:text-emerald-400" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">All Systems Operational</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Everything is running smoothly.</p>
                            </div>
                        ) : (
                            /* Service Status Card Design */
                            <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-200 text-base md:text-lg flex items-center gap-2 truncate min-w-0">
                                        {/* Simple icon based on name length just to vary it slightly if we wanted, or generic server icon */}
                                        {service.name}
                                    </h4>
                                        <span className="flex-shrink-0 flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Operational
                                    </span>
                                </div>

                                {/* Status Bars Visualization */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                                        <span>90 days ago</span>
                                        <span className="text-slate-500 dark:text-slate-300">Today</span>
                                    </div>
                                        <div className="flex items-center justify-between gap-[2px] h-6 mt-1 overflow-hidden">
                                        {getBars(service.name).map((colorClass, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex-1 rounded-sm h-full ${colorClass} opacity-90 hover:opacity-100 transition-opacity min-w-[3px]`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

// Matrix/Hashing Animation Component
const SecureHashAnimation = () => {
    const [hashes, setHashes] = useState<string[]>([]);

    useEffect(() => {
        const generateHash = () => {
            const chars = '0123456789ABCDEF';
            let hash = '0x';
            for (let i = 0; i < 24; i++) {
                hash += chars[Math.floor(Math.random() * chars.length)];
            }
            return hash;
        };

        // Create initial batch
        setHashes(Array.from({ length: 10 }, generateHash));

        const interval = setInterval(() => {
            setHashes(prev => {
                const newHash = generateHash();
                return [newHash, ...prev.slice(0, 9)];
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none select-none" style={{ maskImage: 'linear-gradient(to top, transparent, black)' }}>
            <div className="absolute top-0 right-0 p-8 text-[10px] font-mono leading-tight text-right w-full">
                {hashes.map((hash, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1 - (i * 0.1), x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-emerald-500 dark:text-emerald-400 whitespace-nowrap font-bold"
                    >
                        {hash}
                    </motion.div>
                ))}
            </div>
            {/* Matrix rain effect simplified */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-900 z-10"></div>
        </div>
    );
};

// Terminal Installation Animation Component
const TerminalAnimation = () => {
    const [lines, setLines] = useState<React.ReactNode[]>([<span key="init" className="text-slate-500">$ </span>]);

    useEffect(() => {
        let isMounted = true;

        const runAnimation = async () => {
            if (!isMounted) return;

            // 1. Start clean
            setLines([<span key="prompt" className="text-slate-400 mr-2">$</span>]);
            await new Promise(r => setTimeout(r, 1000));
            if (!isMounted) return;

            // 2. Type command
            const command = "npm install rojifi";
            for (let i = 0; i <= command.length; i++) {
                setLines([
                    <div key="cmd">
                        <span className="text-slate-400 mr-2">$</span>
                        <span className="text-white">{command.slice(0, i)}</span>
                        {i < command.length && <span className="animate-pulse inline-block w-2 h-4 bg-slate-500 ml-1 align-middle"></span>}
                    </div>
                ]);
                await new Promise(r => setTimeout(r, 50 + Math.random() * 30));
                if (!isMounted) return;
            }

            await new Promise(r => setTimeout(r, 500));
            if (!isMounted) return;

            // 3. Show installation progress
            const installLines = [
                <div key="l1" className="text-slate-400">root@dev:~/project</div>,
                <div key="l2" className="text-blue-400">added 1 package, and audited 2 packages in 3s</div>,
                <div key="l3" className="text-green-400">found 0 vulnerabilities</div>,
                <div key="l4" className="text-slate-500 mt-2">Installing dependencies...</div>,
                <div key="l5" className="text-slate-300">[====================] 100%</div>,
                <div key="l6" className="text-slate-400 mt-2">+ rojifi@2.0.0</div>,
                <div key="l7" className="text-green-500 font-bold">Success! Ready to build.</div>,
                <div key="prompt2" className="mt-2 text-slate-400">$ <span className="animate-pulse inline-block w-2 h-4 bg-slate-500 ml-1 align-middle"></span></div>
            ];

            // Render lines with delays
            const currentCmd = (
                <div key="cmd-final">
                    <span className="text-slate-400 mr-2">$</span>
                    <span className="text-white">npm install rojifi</span>
                </div>
            );

            setLines([currentCmd]); // Lock command

            // Simulation of "doing work"
            await new Promise(r => setTimeout(r, 400));
            if (!isMounted) return;
            setLines(prev => [...prev, <div key="progress1" className="text-slate-500 text-xs mt-1">⠋ resolving packages...</div>]);

            await new Promise(r => setTimeout(r, 600));
            if (!isMounted) return;
            setLines(prev => {
                const newLines = [...prev];
                newLines.pop(); // remove spinner
                return [...newLines, <div key="progress2" className="text-slate-500 text-xs mt-1">⠙ fetching tarballs...</div>];
            });

            await new Promise(r => setTimeout(r, 600));
            if (!isMounted) return;
            // ACTUAL FIX: Use installLines here instead of manually constructing the final state again
            setLines(prev => {
                const newLines = [...prev];
                newLines.pop(); // remove spinner
                return [currentCmd, ...installLines];
            });

            // Loop
            await new Promise(r => setTimeout(r, 4000));
            if (isMounted) runAnimation();
        };

        runAnimation();

        return () => { isMounted = false; };
    }, []);

    return (
        <div className="font-mono text-xs md:text-sm p-4 h-full flex flex-col justify-end bg-black/50 rounded-lg border border-white/10 shadow-inner overflow-hidden relative">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20"></div>

            <div className="relative z-10 flex flex-col justify-end min-h-0">
                {lines}
            </div>
        </div>
    );
};

function Homepage() {


    return (
        <MainLayout>
            <div className="relative isolate overflow-hidden">
                {/* D3 Background Animation */}
                <D3Network />

                {/* Hero Section */}
                <div className="container mx-auto px-4 pt-32 pb-12 sm:pt-40 sm:pb-24 lg:pb-32">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center lg:text-left"
                        >
                            <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-xs sm:text-sm leading-6 text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 backdrop-blur-sm">
                                <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2"></span>
                                Introducing API  v2.0
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-6 font-display">
                                Financial infra for <br className="hidden sm:block" />
                                <span className="text-brand-600 dark:text-brand-400">internet scale</span>.
                            </h1>
                            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
                                Rojifi provides the building blocks for modern financial applications.
                                Accept payments, manage identity, and scale your business with a developer-first API.
                            </p>
                            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-x-6">
                                <Link
                                    to="/docs"
                                    className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-brand-600 dark:bg-brand-500 border border-transparent rounded hover:bg-brand-700 dark:hover:bg-brand-400 transition-all duration-200"
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
                            className="relative w-full mt-8 lg:mt-0"
                        >
                            <CodeWindow />

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

                    {/* Bento Grid Features */}
                    <div className="grid md:grid-cols-6 gap-6 max-w-7xl mx-auto">
                        {/* Card 1: Global Payments (Wide) */}
                        <motion.div
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: false, amount: 0.3 }}
                            variants={{
                                offscreen: { y: 50, opacity: 0, scale: 0.95 },
                                onscreen: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
                            }}
                            className="col-span-1 md:col-span-4 relative rounded-3xl bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden group flex flex-col md:block"
                        >
                            <div className="relative z-20 w-full md:w-1/2 p-6 sm:p-8 pointer-events-none md:pointer-events-auto">
                                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 mb-6 backdrop-blur-sm">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 shadow-sm md:shadow-none">Global Payments</h3>
                                <p className="text-slate-700 dark:text-slate-300 md:text-slate-600 md:dark:text-slate-400 max-w-sm font-medium md:font-normal bg-white/30 dark:bg-slate-900/30 md:bg-transparent rounded-lg p-2 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
                                    Accept transactions from any corner of the world. Unified currency support across 135+ countries.
                                </p>
                            </div>

                            {/* Global Payments - Vertical Carousel Tunnel */}
                            <div className="relative w-full h-[300px] md:absolute md:top-0 md:right-0 md:w-1/2 md:h-full overflow-hidden flex items-center justify-center z-10 md:mask-image-linear-to-l pointer-events-none md:pointer-events-auto mt-4 md:mt-0">
                                {/* Gradient Overlays for Tunnel Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-transparent to-slate-100 dark:from-slate-950 dark:via-transparent dark:to-slate-950 z-20 pointer-events-none"></div>

                                {/* Carousel Container */}
                                <div className="h-full w-full flex items-center justify-center relative scale-90 md:scale-100">
                                    <Carousel3D />
                                </div>

                                {/* Mobile Fade Overlay */}
                                <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/60 md:hidden z-30 pointer-events-none"></div>
                            </div>
                        </motion.div>
                        {/* Card 2: Developer First (Tall) */}
                        <motion.div
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: false, amount: 0.3 }}
                            variants={{
                                offscreen: { y: 50, opacity: 0, scale: 0.95 },
                                onscreen: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8, delay: 0.1 } }
                            }}
                            className="md:col-span-2 relative rounded-3xl bg-slate-900 text-white p-6 overflow-hidden flex flex-col border border-slate-800 min-h-[360px] md:min-h-0"
                        >
                            <div className="relative z-10 mb-4 flex-shrink-0">
                                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-white mb-4 backdrop-blur-sm border border-white/5">
                                    <Terminal className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">Developer First</h3>
                                <p className="text-slate-400 text-sm">Top-tier typed SDKs.</p>
                            </div>

                            {/* Terminal Animation Container */}
                            <div className="flex-1 w-full relative rounded-lg overflow-hidden bg-[#1e1e1e] shadow-2xl border border-white/5 flex flex-col">
                                {/* Terminal Header */}
                                <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/5 flex-shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                    <div className="ml-auto text-[10px] text-slate-500 font-mono">zsh — 80x24</div>
                                </div>

                                {/* Terminal Body */}
                                <div className="flex-1 min-h-[140px] relative">
                                    <div className="absolute inset-0">
                                        <TerminalAnimation />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3: Secure (Tall) */}
                        <motion.div
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: false, amount: 0.3 }}
                            variants={{
                                offscreen: { y: 50, opacity: 0, scale: 0.95 },
                                onscreen: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8, delay: 0.2 } }
                            }}
                            className="md:col-span-2 relative rounded-3xl bg-slate-900 overflow-hidden group border border-slate-800 min-h-[300px] md:min-h-0"
                        >
                            {/* Matrix Background */}
                            <div className="absolute inset-0 z-0">
                                <SecureHashAnimation />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-6 border border-emerald-500/30 backdrop-blur-sm">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Secure</h3>
                                    <p className="text-slate-400 text-sm">
                                        PCI-DSS Level 1 Compliant. Default encryption.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500/70 mt-4">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    ENCRYPTION_ACTIVE: AES-256
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 4: Uptime (Wide) -> Now Status Page Carousel */}
                        <motion.div
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: false, amount: 0.3 }}
                            variants={{
                                offscreen: { y: 50, opacity: 0, scale: 0.95 },
                                onscreen: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8, delay: 0.3 } }
                            }}
                            className="md:col-span-4 relative rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 overflow-hidden group flex flex-col md:flex-row items-center justify-between min-h-[500px] md:min-h-[320px]"
                        >
                            {/* Left Content */}
                            <div className="relative z-10 w-full md:w-1/3 mb-8 md:mb-0">
                                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-6 backdrop-blur-md">
                                    <Server className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Real-time Status</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                                    Transparency at the core. Monitor our systems 24/7 with our public status dashboard.
                                </p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-800">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    All Systems Operational
                                </div>
                            </div>

                            {/* Right Visualization - The Carousel */}
                            <div className="relative w-full md:w-2/3 h-[320px] flex items-center justify-center">
                                {/* Gradient Overlays for Tunnel/Fade Effect */}
                                <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-950 dark:to-transparent z-20 pointer-events-none"></div>
                                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950 dark:to-transparent z-20 pointer-events-none"></div>

                                <StatusCarousel />
                            </div>
                        </motion.div>
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
