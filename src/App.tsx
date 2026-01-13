import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.tsx';
import DocsLayout from './layouts/DocsLayout.tsx';
import GettingStarted from './pages/GettingStarted.tsx';
import Authentication from './pages/Authentication.tsx';
import Endpoints from './pages/Endpoints.tsx';
import Errors from './pages/Errors.tsx';
import RateLimits from './pages/RateLimits.tsx';
import Examples from './pages/Examples.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/docs" element={<DocsLayout />}>
        <Route index element={<GettingStarted />} />
        <Route path="authentication" element={<Authentication />} />
        <Route path="endpoints" element={<Endpoints />} />
        <Route path="errors" element={<Errors />} />
        <Route path="rate-limits" element={<RateLimits />} />
        <Route path="examples" element={<Examples />} />
      </Route>
    </Routes>
  );
}

export default App;
