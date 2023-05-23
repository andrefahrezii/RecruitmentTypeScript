import React, { useState } from 'react';
import axios from 'axios';
import UserSearchForm from '../components/UserSearchForm';
import UserList from '../components/UserList';
import RepositoryList from '../components/RepositoryList';
import { Row, Col } from 'antd';

interface User {
  id: number;
  login: string;
  avatar_url: string;
}

interface Repository {
  id: number;
  name: string;
  html_url: string;
}

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleSearch = async (username: string) => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${username}&per_page=5`);
      setUsers(response.data.items);
      setRepositories([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUserSelect = async (user: User) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${user.login}/repos`);
      setRepositories(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Row justify="center" align="middle">
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className="search-container">
            <UserSearchForm onSearch={handleSearch} />
          </div>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={24} sm={12}>
          <div className="user-list-container">
            <UserList users={users} onSelectUser={handleUserSelect} />
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className="repository-list-container">
            {repositories.length > 0 && <RepositoryList repositories={repositories} />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
