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
        <Row >
        <Button type="primary" htmlType="submit">
          Search
        </Button>
        </Row>
    </form>
//     <Form onSubmit={handleSubmit}>
//     <Row>
//       <Form.Item>
//         <Input
//           type="text"
//           placeholder="Enter GitHub username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </Form.Item>
//     </Row>
//     <Row>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Search
//         </Button>
//       </Form.Item>
//     </Row>
//   </Form>
  );
};

export default UserSearchForm;