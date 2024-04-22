// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RepoList from './Components/RepoList';
import SingleRepo from './Components/SingleRepo';
import NotFound from './Components/NotFound';
import ErrorBoundary from './Components/ErrorBoundary'; 

function App() {
  return (
    <div className=''>

    <Router>
      <ErrorBoundary> 
        <Routes>
          <Route path="/" element={<RepoList />} />
          <Route path="/repo/:repoName" element={<SingleRepo />} /> {/* Update this line */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
    </div>
  );
}

export default App;
