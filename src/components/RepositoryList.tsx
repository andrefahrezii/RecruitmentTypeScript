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
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default RepositoryList;

