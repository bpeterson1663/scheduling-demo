import { createEpoch } from '../../helpers'

test('create epoch from date and hour string', () => {
  expect(createEpoch('2021-10-22', '03:00')).toBe(1634889600000);
});