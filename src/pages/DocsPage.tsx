import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DOCS_DATA, DocTabId } from '../data/docs';
import { DocsText, DocsCode, DocsEnum, DocsAlert, DocsEndpoint } from '../components/DocsComponents';
import { ChevronRight } from 'lucide-react';

const isDev = import.meta.env.VITE_DOCS_ENV === 'development';

export default function DocsPage() {
    const { version, tab, slug } = useParams<{ version?: string, tab?: string, slug?: string }>();

    // 1. Resolve Version
    const activeVersionStr = version || DOCS_DATA.find(d => d.isLatest)?.version || 'v1';
    const activeVersionData = useMemo(() =>
        DOCS_DATA.find(d => d.version === activeVersionStr),
        [activeVersionStr]);

    // 2. Resolve Tab
    const activeTab = (tab as DocTabId) || 'guides';

    // 3. Flatten pages for CURRENT TAB only
    const allPagesInTab = useMemo(() => {
        if (!activeVersionData) return [];
        const categories = activeVersionData.tabs[activeTab] || [];
        return categories.flatMap(cat =>
            cat.pages.filter(page => isDev || page.status === 'PRODUCTION')
        );
    }, [activeVersionData, activeTab]);

    // 4. Resolve Current Page
    // If no slug is provided, default to the first page of the tab
    const defaultPageSlug = allPagesInTab.length > 0 ? allPagesInTab[0].id : null;
    const currentSlug = slug || defaultPageSlug;

    const currentPage = allPagesInTab.find(p => p.id === currentSlug);

    // --- Redirect Logic if data is missing or URL is incomplete ---
    if (!activeVersionData) return <div className="p-10">Version not found</div>;

    // If slug was empty but we found a default, we effectively render it, 
    // but ideally we might want to change URL. 
    // For now, let's just render.

    if (!currentPage) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl font-bold mb-2">Page not found</h2>
                <p className="text-slate-500">Could not find docs for {activeTab}/{currentSlug}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 lg:py-16">
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 capitalize">
                <span>Docs</span>
                <ChevronRight className="w-4 h-4" />
                <span>{activeVersionData.version}</span>
                <ChevronRight className="w-4 h-4" />
                <span>{activeTab.replace('-', ' ')}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-brand-600 font-medium">{currentPage.title}</span>
            </div>

            <header className="mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {currentPage.title}
                    </h1>
                    {currentPage.status === 'DEV' && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 font-bold border border-yellow-200 dark:border-yellow-800/50">
                            DEV
                        </span>
                    )}
                </div>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-light">
                    {currentPage.description}
                </p>
            </header>

            <div className="space-y-4">
                {currentPage.content.map((section, idx) => {
                    switch (section.type) {
                        case 'text':
                            return <DocsText key={idx}>{section.content}</DocsText>;
                        case 'code':
                            return section.codeSnippet ? <DocsCode key={idx} snippet={section.codeSnippet} /> : null;
                        case 'enum':
                            return section.enumData ? <DocsEnum key={idx} data={section.enumData} /> : null;
                        case 'alert':
                            return <DocsAlert key={idx} variant={section.variant}>{section.content}</DocsAlert>;
                        case 'endpoint':
                            return section.endpointData ? (
                                <DocsEndpoint
                                    key={idx}
                                    method={section.endpointData.method}
                                    path={section.endpointData.path}
                                    description={section.endpointData.description}
                                />
                            ) : null;
                        default:
                            return null;
                    }
                })}
            </div>

            <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                <div />
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-sm font-medium text-brand-600 hover:text-brand-500"
                >
                    Back to top ↑
                </button>
            </div>
        </div>
    );
}
