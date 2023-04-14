import { render, screen, fireEvent } from '@testing-library/react';
import SafeUI from '../safeUI/SafeUI';

test('submit button is disabled when required fields are empty', () => {
  render(<SafeUI />);
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(submitButton).toBeDisabled();
});

test('displays word count of message', () => {
  render(<SafeUI />);
  const messageInput = screen.getByPlaceholderText(/Enter Message/i);
  fireEvent.change(messageInput, {
    target: { value: 'This is a test message' },
  });
  expect(screen.getByText(/5 words/i)).toBeInTheDocument();
});
