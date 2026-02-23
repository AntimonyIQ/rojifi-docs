import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Play, Check, Copy } from "lucide-react";
import {
  CodeSnippet,
  DocEnum,
  DocParameter,
  DocSchemaField,
} from "../data/docs";

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
        <span className="text-xs font-mono text-slate-400 uppercase">
          {snippet.language}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          {snippet.runnable && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3 py-1 bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
            >
              <Play className="w-3 h-3" />
              {isRunning ? "Running..." : "Run"}
            </button>
          )}
        </div>
      </div>
      <div className="text-sm">
        <SyntaxHighlighter
          language={snippet.language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            background: "transparent",
          }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>

      {outputVisible && snippet.output && (
        <div className="border-t border-white/10 bg-black/30">
          <div className="px-4 py-1 text-[10px] text-slate-500 font-mono uppercase tracking-wider bg-white/5">
            Output
          </div>
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
      <h4 className="font-mono text-sm font-bold text-slate-900 dark:text-white">
        {data.name}
      </h4>
      {data.description && (
        <p className="text-xs text-slate-500 mt-1">{data.description}</p>
      )}
    </div>
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {data.values.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 px-4 py-3 bg-white dark:bg-slate-950/50"
        >
          <code className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded w-fit min-w-[120px]">
            {item.name}
          </code>
          <code className="text-xs text-slate-400 font-mono hidden sm:inline-block">
            {item.value}
          </code>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {item.description}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const DocsAlert = ({
  variant = "info",
  children,
}: {
  variant?: "info" | "warning" | "danger" | "success";
  children: React.ReactNode;
}) => {
  const styles = {
    info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
    warning:
      "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
    danger:
      "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
    success:
      "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  };

  return (
    <div className={`p-4 my-6 rounded-md border ${styles[variant]} text-sm`}>
      {children}
    </div>
  );
};

export const DocsEndpoint = ({
  method,
  path,
  description,
}: {
  method: string;
  path: string;
  description?: string;
}) => {
  const methodColors: Record<string, string> = {
    GET: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    POST: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800",
    PUT: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    DELETE:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800",
  };

  return (
    <div className="my-6 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="flex items-center gap-3 font-mono text-sm">
        <span
          className={`px-2.5 py-1 rounded font-bold border ${methodColors[method] || "bg-slate-100 text-slate-700"}`}
        >
          {method}
        </span>
        <span className="text-slate-700 dark:text-slate-300">{path}</span>
      </div>
      {description && (
        <div className="mt-2 text-sm text-slate-500 dark:text-slate-400 pl-1">
          {description}
        </div>
      )}
    </div>
  );
};

export const DocsParameterTable = ({
  title,
  parameters,
}: {
  title?: string;
  parameters: DocParameter[];
}) => {
  return (
    <div className="my-6">
      {title && (
        <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">
          {title}
        </h3>
      )}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-medium">
            <tr>
              <th className="px-4 py-3">Parameter</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Required</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {parameters.map((param, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">
                  {param.name}
                </td>
                <td className="px-4 py-3 text-slate-500">{param.type}</td>
                <td className="px-4 py-3">
                  {param.required ? (
                    <span className="text-rose-500 font-medium text-xs bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded">
                      Required
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs">Optional</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {param.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DocsSchemaTable = ({
  title,
  fields,
  level = 0,
}: {
  title?: string;
  fields: DocSchemaField[];
  level?: number;
}) => {
  return (
    <div className={`${level === 0 ? "my-6" : "mt-2"}`}>
      {level === 0 && title && (
        <h3 className="text-lg font-semibold mb-3 text-white">{title}</h3>
      )}
      <div
        className={`${level === 0 ? "rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden" : ""}`}
      >
        <table className="w-full text-left text-sm border-collapse">
          {level === 0 && (
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600">
              <tr>
                <th className="px-4 py-3">Field</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {fields.map((field, i) => (
              <React.Fragment key={i}>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <td
                    className="px-4 py-3 font-mono"
                    style={{ paddingLeft: `${(level + 1) * 1.5}rem` }}
                  >
                    <div className="flex items-center">
                      {level > 0 && (
                        <span className="text-slate-300 mr-2">└</span>
                      )}
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {field.name}
                      </span>
                      {field.required && (
                        <span className="ml-2 text-[10px] text-rose-500 font-bold uppercase">
                          Req
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 italic">
                    {field.type}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {field.description}
                  </td>
                </tr>
                {field.children && field.children.length > 0 && (
                  <DocsSchemaTable fields={field.children} level={level + 1} />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DocsResponse = ({
  data,
}: {
  data: {
    status: number;
    description: string;
    example: any;
  };
}) => {
  const isError = data.status >= 400;

  return (
    <div className="my-6 space-y-3">
      <div className="flex items-center gap-3">
        <span
          className={`px-2 py-1 rounded text-xs font-bold ${
            isError
              ? "bg-rose-100 text-rose-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {data.status}
        </span>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {data.description}
        </span>
      </div>

      <div className="rounded-xl overflow-hidden shadow-sm">
        <DocsCode
          snippet={{
            code: JSON.stringify(data.example, null, 2),
            language: "json",
          }}
        />
      </div>
    </div>
  );
};
