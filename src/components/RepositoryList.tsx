import React from 'react';

interface Repository {
  id: number;
  name: string;
  html_url: string;
}

interface RepositoryListProps {
  repositories: Repository[];
}


const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id}>
          <p>{repo.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default RepositoryList;

