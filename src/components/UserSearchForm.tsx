import React, { useState } from 'react';
import { Input, Button, Row } from 'antd';
interface UserSearchFormProps {
  onSearch: (username: string) => void;
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(username);
  };
  
  return (

    <form onSubmit={handleSubmit}>
        <Row>
        <Input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
        </Row>
        <Row justify="center" align="middle">
        <Button type="primary" htmlType="submit"  style={{ height:"40px", width:"340px"}}>
          Search
        </Button>
        </Row>
    </form>
  );
};

export default UserSearchForm;