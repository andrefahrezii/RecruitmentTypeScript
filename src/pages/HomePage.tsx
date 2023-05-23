import React, { useState } from 'react';
import axios from 'axios';
import UserSearchForm from '../components/UserSearchForm';
import UserList from '../components/UserList';
import { Row, Col, Spin } from 'antd';

interface User {
  id: number;
  login: string;
  avatar_url: string;
  score?: string;
  repositories?: Repository[];
}

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false); 

  const handleSearch = async (username: string) => {
    try {
      setLoading(true); 

      const response = await axios.get(`https://api.github.com/search/users?q=${username}&per_page=5`);
      const usersWithRepositories = await Promise.all(
        response.data.items.map(async (item: any) => {
          const userResponse = await axios.get(`https://api.github.com/users/${item.login}`);
          const user: User = {
            id: userResponse.data.id,
            login: userResponse.data.login,
            avatar_url: userResponse.data.avatar_url,
            score: item.score,
          };
          const reposResponse = await axios.get(`https://api.github.com/users/${item.login}/repos`);
          const repositories: Repository[] = reposResponse.data.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description,
          }));
          user.repositories = repositories;
          return user;
        })
      );

      setUsers(usersWithRepositories);
      setLoading(false); 
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); 
    }
  };

  return (
    <div style={{ paddingTop: '20px' ,justifyContent: 'center', alignItems: 'center', padding:"20px" }}>
      <Row justify="center" align="middle"  >
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className="search-container">
            <UserSearchForm onSearch={handleSearch} />
          </div>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className="user-list-container">
            {loading ? ( 
              <Spin size="small"  />
            ) : (
              <UserList users={users} />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
