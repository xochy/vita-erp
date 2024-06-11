import * as matchers from '@testing-library/jest-dom/matchers';
import LoadingAlert from './LoadingAlert.vue';
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/vue';

expect.extend(matchers);

describe('LoadingAlert component', () => {
  it('Should render correctly', () => {
    render(LoadingAlert);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});