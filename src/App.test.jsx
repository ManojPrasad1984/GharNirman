// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';

afterEach(() => cleanup());

describe('GharNirman discovery', () => {
  it('shows providers available around Nagpur', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /available in nagpur/i })).toBeTruthy();
    expect(screen.getByText('Ramesh Patil')).toBeTruthy();
  });

  it('filters providers by the entered trade or name', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Search a trade or name'), {
      target: { value: 'plumber' },
    });

    expect(screen.getByText('Aamir Khan')).toBeTruthy();
    expect(screen.queryByText('Ramesh Patil')).toBeNull();
  });

  it('opens the requirement form and posts a new request', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /post a requirement/i }));
    fireEvent.change(screen.getByPlaceholderText('e.g. Mason crew for foundation work'), {
      target: { value: 'Mason crew for boundary wall' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Post requirement' }));

    expect(screen.getByRole('heading', { name: 'Your open requests' })).toBeTruthy();
    expect(screen.getByText('Mason crew for boundary wall')).toBeTruthy();
  });
});
