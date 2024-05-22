import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
//  Close server after all tests
afterAll(() => server.close())
// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

test('should return user', async () => {
  const response = await fetch("https://example.com/user");
  const user = await response.json();
  expect(user).toEqual({
    id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
    firstName: "John",
    lastName: "Maverick",
  });
});
