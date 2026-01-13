import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import DocsLayout from './layouts/DocsLayout';
import GettingStarted from './pages/GettingStarted';
import Authentication from './pages/Authentication';
import Endpoints from './pages/Endpoints';
import Errors from './pages/Errors';
import RateLimits from './pages/RateLimits';
import Examples from './pages/Examples';

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
