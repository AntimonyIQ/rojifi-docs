import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, Check, Copy } from 'lucide-react';
import { CodeSnippet, DocEnum } from '../data/docs';

export const DocsText = ({ children }: { children: React.ReactNode }) => (
    <div className="prose dark:prose-invert max-w-none mb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
        {children}
    </div>
);

export const DocsCode = ({ snippet }: { snippet: CodeSnippet }) => {
    const [outputVisible, setOutputVisible] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleRun = () => {
        if (!snippet.runnable) return;
        setIsRunning(true);
        setOutputVisible(false);

        // Simulate API latency
        setTimeout(() => {
            setIsRunning(false);
            setOutputVisible(true);
        }, 800);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#1e1e1e] shadow-md">
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/10">
                <span className="text-xs font-mono text-slate-400 uppercase">{snippet.language}</span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white"
                        title="Copy code"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    {snippet.runnable && (
                        <button
                            onClick={handleRun}
                            disabled={isRunning}
                            className="flex items-center gap-1.5 px-3 py-1 bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
                        >
                            <Play className="w-3 h-3" />
                            {isRunning ? 'Running...' : 'Run'}
                        </button>
                    )}
                </div>
            </div>
            <div className="text-sm">
                <SyntaxHighlighter
                    language={snippet.language}
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
                >
                    {snippet.code}
                </SyntaxHighlighter>
            </div>

            {outputVisible && snippet.output && (
                <div className="border-t border-white/10 bg-black/30">
                    <div className="px-4 py-1 text-[10px] text-slate-500 font-mono uppercase tracking-wider bg-white/5">Output</div>
                    <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto">
                        {snippet.output}
                    </pre>
                </div>
            )}
        </div>
    );
};

export const DocsEnum = ({ data }: { data: DocEnum }) => (
    <div className="my-6 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-900 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <h4 className="font-mono text-sm font-bold text-slate-900 dark:text-white">{data.name}</h4>
            {data.description && <p className="text-xs text-slate-500 mt-1">{data.description}</p>}
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.values.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 px-4 py-3 bg-white dark:bg-slate-950/50">
                    <code className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded w-fit min-w-[120px]">
                        {item.name}
                    </code>
                    <code className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                        {item.value}
                    </code>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.description}</span>
                </div>
            ))}
        </div>
    </div>
);

export const DocsAlert = ({ variant = 'info', children }: { variant?: 'info' | 'warning' | 'danger' | 'success', children: React.ReactNode }) => {
    const styles = {
        info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
        warning: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
        danger: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
        success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    };

    return (
        <div className={`p-4 my-6 rounded-md border ${styles[variant]} text-sm`}>
            {children}
        </div>
    );
};

export const DocsEndpoint = ({ method, path, description }: { method: string, path: string, description?: string }) => {
    const methodColors: Record<string, string> = {
        GET: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        POST: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800',
        PUT: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800',
        DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800',
    };

    return (
        <div className="my-6 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-3 font-mono text-sm">
                <span className={`px-2.5 py-1 rounded font-bold border ${methodColors[method] || 'bg-slate-100 text-slate-700'}`}>
                    {method}
                </span>
                <span className="text-slate-700 dark:text-slate-300">{path}</span>
            </div>
            {description && <div className="mt-2 text-sm text-slate-500 dark:text-slate-400 pl-1">{description}</div>}
        </div>
    );
};
