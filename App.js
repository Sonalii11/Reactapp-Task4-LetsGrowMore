import React, { useState } from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem;
`;

const UserCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar>
        <div>SONALI SINGH</div>
        <Button onClick={fetchUsers}>Get Users</Button>
      </Navbar>
      <UserGrid>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          users.map(user => (
            <UserCard key={user.id}>
              <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
            </UserCard>
          ))
        )}
      </UserGrid>
    </div>
  );
}

export default App;


