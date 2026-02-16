import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage.tsx';
import DocsLayout from './layouts/DocsLayout.tsx';
import DocsPage from './pages/DocsPage.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/docs" element={<DocsLayout />}>
        {/* Redirect /docs base to guides */}
        <Route index element={<Navigate to="/docs/v1/guides/getting-started" replace />} />

        {/* Redirect /docs/v1 to guides */}
        <Route path=":version" element={<Navigate to="guides" replace />} />

        {/* Handles /docs/v1/guides, /docs/v1/api-reference -> renders default page defined in DocsPage logic or we can be explicit here by adding another redirect if needed. 
            The DocsPage handles slug being optional now.
        */}
        <Route path=":version/:tab" element={<DocsPage />} />
        <Route path=":version/:tab/:slug" element={<DocsPage />} />
      </Route>
    </Routes>
  );
}

export default App;

