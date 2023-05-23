import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
const axios = require('axios');



jest.mock('axios');

const mockUsers = [
  { id: 1, login: 'user1', avatar_url: 'https://avatar.com/user1' },
  { id: 2, login: 'user2', avatar_url: 'https://avatar.com/user2' },
];

const mockRepositories = [
  { id: 1, name: 'repo1', html_url: 'https://github.com/repo1' },
  { id: 2, name: 'repo2', html_url: 'https://github.com/repo2' },
];

test('renders HomePage component', () => {
  const { getByText, getByPlaceholderText } = render(<HomePage />);

  const searchInput = getByPlaceholderText('Enter GitHub username');
  const searchButton = getByText('Search');

  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test('fetches users and displays them when search is performed', async () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({ data: { items: mockUsers } });


  const { getByPlaceholderText, getByText } = render(<HomePage />);

  const searchInput = getByPlaceholderText('Enter GitHub username');
  const searchButton = getByText('Search');

  fireEvent.change(searchInput, { target: { value: 'testuser' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.github.com/search/users?q=testuser&per_page=5'
    );
    expect(getByText('user1')).toBeInTheDocument();
    expect(getByText('user2')).toBeInTheDocument();
  });
});

test('fetches repositories and displays them when a user is selected', async () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({ data: { items: mockUsers } });


  const { getByText, getAllByTestId } = render(<HomePage />);

  const searchInput = getByText('Search');
  fireEvent.click(searchInput);

  const user1 = getAllByTestId('user-item')[0];
  fireEvent.click(user1);

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.github.com/users/user1/repos'
    );
    expect(getByText('repo1')).toBeInTheDocument();
    expect(getByText('repo2')).toBeInTheDocument();
  });
});
