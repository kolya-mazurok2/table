import { getAll } from '.';
import { authors } from '../../../db';

describe('Fetches authors', () => {
  test('Successfully receives authors', async () => {
    const response = await getAll();

    expect(response.data).toEqual(authors);
    expect(response.success).toBe(true);
  });
});
