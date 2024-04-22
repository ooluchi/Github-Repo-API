// RepoList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10; // Number of repositories per page

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/ooluchi/repos?page=${currentPage}&per_page=${perPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        return response.json();
      })
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div 
    className='flex flex-col min-h-screen bg-green-200 items-center bg-cover'
    style={{
      backgroundColor: ''
    }}
    >
      <h1 className='font-extrabold text-3xl  '>Welcome to a List of my Github Repositories</h1>
      <h2 className='text-lg font-semibold mt-3'>Repositories</h2>
      <ul className='my-5 text-base font-medium'>
        {repos.map(repo => (
          <li key={repo.id}>
            <Link to={`/repo/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
      <div className='flex'>
      <button onClick={prevPage} disabled={currentPage === 1} className='border rounded-full bg-green-600 text-white w-20'>Previous</button>
      <button onClick={nextPage} className='border rounded-full bg-green-600 text-white w-20'>Next </button>
      </div>
    </div>
  );
}

export default RepoList;
