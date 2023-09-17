import { calculateDistance, isWithinRadius } from '../src/scripts/utils/helpers.js';

/** 
 * @desc unit tests for the computeDistance.
 * The tests here are straightforward and verifies the basic functionality,
 * so tests are not commented.
 */
describe('calculateDistance', () => {
  test('calculate distance between two origin points', () => {
    expect(calculateDistance(0, 0, 0, 0)).toBe(0);
  });

  test('calculate distance between two points in the positive quadrant', () => {
    expect(calculateDistance(1, 1, 4, 5)).toBe(5);
  });

  test('calculate distance between two points in the negative quadrant', () => {
    expect(calculateDistance(-1, -1, -4, -5)).toBe(5);
  });

  test('calculate distance between one point in the positive quadrant and another in the negative quadrant', () => {
    expect(calculateDistance(-1, -1, 2, 3)).toBe(5);
  });
  
});

/** 
 * @desc unit tests for the isWithinRadius function.
 * The tests here are straightforward and verifies the basic functionality,
 * so tests are not commented.
 */
describe('isWithinRadius', () => {
  test('check if point is within radius (inside)', () => {
    expect(isWithinRadius(0, 0, 3, 4, 6)).toBe(true);
  });

  test('check if point is within radius (on)', () => {
    expect(isWithinRadius(0, 0, 3, 4, 5)).toBe(true);
  });

  test('check if point is within radius (outside)', () => {
    expect(isWithinRadius(0, 0, 3, 4, 4)).toBe(false);
  });

  test('check if origin is within radius (radius zero)', () => {
    expect(isWithinRadius(0, 0, 0, 0, 0)).toBe(true);
  });

  test('check if origin is within radius (radius non-zero)', () => {
    expect(isWithinRadius(0, 0, 0, 0, 1)).toBe(true);
  });

});
