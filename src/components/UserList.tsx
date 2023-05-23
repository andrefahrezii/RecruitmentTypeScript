import React from 'react';
import { Collapse, Rate, Row, Col } from 'antd';

interface User {
  id: number;
  login: string;
  avatar_url: string;
  score?: string;
  repositories?: Repository[]; // Tambahkan properti repositories di sini
}

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const onChange = (key: string | string[], user: User) => {
    // Implementasikan logika ketika panel collapse berubah
  };

  return (
    <Row justify="center" align="middle">
      <Col>
        {users.map((user) => (
          <Collapse key={user.id} defaultActiveKey={['1']} onChange={(key) => onChange(key, user)}>
            <Collapse.Panel header={user.login} key="1">
              <img src={user.avatar_url} alt={user.login} height="100px" width="150px" />
              <Rate allowHalf defaultValue={user.score ? parseInt(user.score) : undefined} />
              {user.repositories && user.repositories.length > 0 && (
                <ul>
                  {user.repositories.map((repo) => (
                    <li key={repo.id}>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                      <p>{repo.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </Collapse.Panel>
          </Collapse>
        ))}
      </Col>
    </Row>
  );
};

export default UserList;
