// SingleRepo.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SingleRepo() {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/repos/ooluchi/${repoName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch repository');
        }
        return response.json();
      })
      .then(data => {
        setRepo(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching repo:', error);
        setLoading(false);
      });
  }, [repoName]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col min-h-screen bg-green-200 items-center bg-cover'>
      {repo ? (
        <div className=''>
          <h2 className='text-lg font-bold mt-3'>{repo.name}</h2>
          <p className='font-semibold mt-4'>Description: {repo.description}</p>
          <div className='font-medium my-2'>
          <p>Stars: {repo.stargazers_count}</p>
          <p>Forks: {repo.forks_count}</p>
          </div>
        </div>
      ) : (
        <div>Hold on for a moment</div>
      )}
    </div>
  );
}

export default SingleRepo;
