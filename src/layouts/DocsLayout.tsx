import React, { useState, useMemo, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, Command, FileText, Hash, Box, History } from 'lucide-react';
import { DOCS_DATA, DocTabId } from '../data/docs';

const isDev = import.meta.env.VITE_DOCS_ENV === 'development';

const TABS_ORDER: { id: DocTabId; label: string }[] = [
  { id: 'guides', label: 'Guides' },
  { id: 'api-reference', label: 'API Reference' },
  { id: 'sdks', label: 'SDKs' },
  { id: 'changelog', label: 'Changelog' },
];

const DocsLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { version, tab } = useParams<{ version?: string; tab?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active version
  const activeVersionStr = version || DOCS_DATA.find(d => d.isLatest)?.version || 'v1';
  const activeVersionData = DOCS_DATA.find(d => d.version === activeVersionStr);

  // Determine active tab (default to guides if not specified)
  const activeTabId = (tab as DocTabId) || 'guides';
  const activeTabCategories = activeVersionData?.tabs[activeTabId] || [];

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search on navigation
  useEffect(() => {
    setIsSearchOpen(false);
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVersion = e.target.value;
    navigate(`/docs/${newVersion}/${activeTabId}`);
  };

  // Search Logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results: Array<{
      version: string;
      tab: string;
      category: string;
      page: { id: string; title: string; status: 'DEV' | 'PRODUCTION' };
    }> = [];

    if (activeVersionData) {
      TABS_ORDER.forEach(t => {
        const categories = activeVersionData.tabs[t.id];
        if (categories) {
          categories.forEach(c => {
            c.pages.forEach(p => {
              if (p.status === 'DEV' && !isDev) return;

              if (p.title.toLowerCase().includes(query) || p.id.includes(query)) {
                results.push({
                  version: activeVersionStr,
                  tab: t.id,
                  category: c.title,
                  page: p
                });
              }
            });
          });
        }
      });
    }
    return results;
  }, [searchQuery, activeVersionData, activeVersionStr]);

  // Tab Icons mapping
  const getTabIcon = (id: string) => {
    switch (id) {
      case 'guides': return <FileText size={16} />;
      case 'api-reference': return <Hash size={16} />;
      case 'sdks': return <Box size={16} />;
      case 'changelog': return <History size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto h-16 px-4 flex items-center justify-between gap-4">

          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white shrink-0">
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <span className="text-xl tracking-tight"><span className="text-brand-600">Rojifi</span> Docs</span>
            </div>

            {/* Version Selector (Desktop) */}
            <div className="hidden md:flex items-center relative">
              <select
                value={activeVersionStr}
                onChange={handleVersionChange}
                className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 py-1.5 pl-3 pr-8 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors cursor-pointer"
              >
                {DOCS_DATA.map(v => (
                  <option key={v.version} value={v.version}>{v.version} {v.isLatest ? '(Latest)' : ''}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Desktop Tabs */}
            <nav className="hidden lg:flex items-center gap-1">
              {TABS_ORDER.map((t) => (
                <NavLink
                  key={t.id}
                  to={`/docs/${activeVersionStr}/${t.id}`}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${isActive || (activeTabId === t.id && location.pathname === `/docs/${activeVersionStr}`)
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}
                  `}
                >
                  {getTabIcon(t.id)}
                  {t.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors w-full max-w-xs justify-between group"
          >
            <div className="flex items-center gap-2">
              <Search size={14} className="group-hover:text-slate-700 dark:group-hover:text-slate-200" />
              <span>Search documentation...</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] font-medium text-slate-400">
              <Command size={10} />
              <span>K</span>
            </div>
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">

        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-72 transform bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 
            transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="h-full overflow-y-auto px-4 py-8 md:px-6">

            {/* Mobile Tabs Wrapper */}
            <div className="lg:hidden mb-8 space-y-4">
              <div className="relative">
                <select
                  value={activeVersionStr}
                  onChange={handleVersionChange}
                  className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2 pl-3 pr-8 rounded-lg text-sm font-medium"
                >
                  {DOCS_DATA.map(v => (
                    <option key={v.version} value={v.version}>{v.version} {v.isLatest ? '(Latest)' : ''}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <nav className="flex flex-col gap-1">
                {TABS_ORDER.map((t) => (
                  <NavLink
                    key={t.id}
                    to={`/docs/${activeVersionStr}/${t.id}`}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) => `
                          flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                          ${isActive || activeTabId === t.id
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400'}
                        `}
                  >
                    {getTabIcon(t.id)}
                    {t.label}
                  </NavLink>
                ))}
              </nav>
              <hr className="border-slate-200 dark:border-slate-800" />
            </div>

            {/* Sidebar Categories */}
            <nav className="space-y-8">
              {activeTabCategories.map((category) => (
                <div key={category.title}>
                  <h4 className="mb-3 text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                    {category.title}
                  </h4>
                  <ul className="space-y-1 border-l border-slate-200 dark:border-slate-800 ml-1">
                    {category.pages.map((page) => {
                      if (page.status === 'DEV' && !isDev) return null;

                      return (
                        <li key={page.id}>
                          <NavLink
                                        to={`/docs/${activeVersionStr}/${activeTabId}/${page.id}`}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) => `
                                                  block pl-4 py-1.5 text-sm transition-colors border-l -ml-px
                                                  ${isActive
                                            ? 'border-brand-600 text-brand-600 dark:text-brand-400 font-medium'
                                            : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                                                  }
                                              `}
                                      >
                                        <span className="flex items-center justify-between">
                                          {page.title}
                                          {page.status === 'DEV' && (
                                            <span className="ml-2 text-[9px] uppercase font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-1.5 py-0.5 rounded">DEV</span>
                                          )}
                                        </span>
                                      </NavLink>
                                    </li>
                                );
                              })}
                      </ul>
                    </div>
                  ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 w-full min-w-0 py-8 px-4 md:px-8 max-w-4xl">
          <Outlet />
        </main>

        {/* Right TOC (Optional - could be added later for slug-specific TOC) */}
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 dark:bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSearchOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden ring-1 ring-black/5">
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Search docs..."
                className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400"
              >
                <span className="text-xs font-medium px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 rounded-md">Expected Esc</span>
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {searchQuery && searchResults.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="space-y-1">
                  <div className="px-2 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Documentation
                  </div>
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(`/docs/${result.version}/${result.tab}/${result.page.id}`);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left px-3 py-3 rounded-lg flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    >
                           <div className="flex items-center gap-3">
                             <div className="p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-slate-500 group-hover:border-brand-500/30 group-hover:text-brand-600 transition-colors">
                               <FileText size={16} />
                             </div>
                             <div>
                               <div className="font-medium text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                                 {result.page.title}
                               </div>
                               <div className="text-xs text-slate-500 flex items-center gap-2">
                                 <span className="capitalize">{result.tab.replace('-', ' ')}</span>
                                 <span>•</span>
                                 <span>{result.category}</span>
                                 {result.page.status === 'DEV' && (
                                   <span className="text-[9px] uppercase font-bold bg-yellow-100 text-yellow-700 px-1 py-0.5 rounded ml-1">DEV</span>
                                 )}
                               </div>
                             </div>
                           </div>
                           <div className="opacity-0 group-hover:opacity-100 text-slate-400">
                             <Command size={14} className="rotate-90" />
                           </div>
                         </button>
                       ))}
                </div>
              )}

              {!searchQuery && (
                <div className="p-4">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Popular
                  </div>
                  {/* Add some default quick links here if needed */}
                  <div className="text-sm text-slate-500 italic">Type to search...</div>
                </div>
              )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Command size={10} />
                <span>to select</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">↑↓</span>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Esc</span>
                <span>to close</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DocsLayout;
