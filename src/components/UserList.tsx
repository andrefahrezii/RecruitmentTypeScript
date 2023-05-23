// import React from 'react';
// import { Collapse, Rate, Row} from 'antd';


// interface User {
//   id: number;
//   login: string;
//   avatar_url: string;
//   score?: string;
//   repos_url?: string;
// }

// interface UserListProps {
//   users: User[];
//   onSelectUser: (user: User) => void;
// }

// const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
//     const onChange = (key: string | string[]) => {
//         console.log(key);
//       };
//     console.log(users)
//   return (
    
    
//     <Row justify="center">
//     {users.reverse().map((user) => (
//       <Collapse key={user.id} defaultActiveKey={['1']} onChange={onChange}>
//         <Collapse.Panel header={user.login} key="1">
//           <img src={user.avatar_url} alt={user.login} height="100px" width="150px" />
//           <Rate allowHalf defaultValue={user.score ? parseInt(user.score) : undefined} />
//         </Collapse.Panel>
//       </Collapse>
//     ))}
//   </Row>
//   );
// };

// export default UserList;


import React from 'react';
import { Collapse, Rate, Row } from 'antd';

interface User {
  id: number;
  login: string;
  avatar_url: string;
  score?: string;
  repos_url?: string;
}

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  const onChange = (key: string | string[], user: User) => {
    if (key.includes('1')) {
      onSelectUser(user);
    }
  };

  return (
    <Row justify="center">
      {users.reverse().map((user) => (
        <Collapse key={user.id} defaultActiveKey={['1']} onChange={(key) => onChange(key, user)}>
          <Collapse.Panel header={user.login} key="1">
            <img src={user.avatar_url} alt={user.login} height="100px" width="150px" />
            <Rate allowHalf defaultValue={user.score ? parseInt(user.score) : undefined} />
          </Collapse.Panel>
        </Collapse>
      ))}
    </Row>
  );
};

export default UserList;
