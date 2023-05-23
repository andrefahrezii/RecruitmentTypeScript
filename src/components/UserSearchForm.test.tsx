import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserSearchForm from './UserSearchForm';

describe('UserSearchForm', () => {
  test('renders without error', () => {
    render(<UserSearchForm onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Enter GitHub username');
    const buttonElement = screen.getByText('Search');
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onSearch with input value when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<UserSearchForm onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Enter GitHub username');
    const buttonElement = screen.getByText('Search');
    const username = 'john_doe';

    fireEvent.change(inputElement, { target: { value: username } });
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith(username);
  });
});
