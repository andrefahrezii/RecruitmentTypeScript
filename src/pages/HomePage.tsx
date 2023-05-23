import React, { useState } from 'react';
import axios from 'axios';
import UserSearchForm from '../components/UserSearchForm';
import UserList from '../components/UserList';
import RepositoryList from '../components/RepositoryList';
import {  Row, Col } from 'antd';

interface User {
  id: number;
  login: string;
  avatar_url: string;
}

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [repositories, setRepositories] = useState<any[]>([]);

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

//   return (
    
//     <Row>
// <div className="home-page">
//       <div className="search-container">
//         <UserSearchForm onSearch={handleSearch} />
//       </div>
//       <div className="content-container">
//         <div className="user-list-container">
//           <UserList users={users} onSelectUser={handleUserSelect} />
//         </div>
//         <div className="repository-list-container">
//           {repositories.length > 0 && <RepositoryList repositories={repositories} />}
//         </div>
//       </div>
//     </div>
//     </Row>
    
//   );
// };
return (
  <div>
    <Row justify="center" align="middle">
      <Col xs={26} sm={26} md={8} lg={6}>
        <div className="search-container">
          <UserSearchForm onSearch={handleSearch} />
        </div>
      </Col>
    </Row>
    <Row justify="center" align="middle">
      <Col xl={26} xs={26} >
        <div className="user-list-container">
          <UserList users={users} onSelectUser={handleUserSelect} />
        </div>
      </Col>
      <Col xs={26} sm={26} >
        <div className="repository-list-container">
          {repositories.length > 0 && <RepositoryList repositories={repositories} />}
        </div>
      </Col>
    </Row>
  </div>
);
};

export default HomePage;
