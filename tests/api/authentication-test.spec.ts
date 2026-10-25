import {expect, test} from "../../fixtures/api-fixture";

test('should generate token with valid credentials', async ( { tokenManager }) => {
  const token = await tokenManager.getToken();
  console.log('Generated Token:', token);
  expect(token).toBeTruthy();
  expect(typeof token).toBe('string');
});