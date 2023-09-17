import { convert1DArrayTo2D, makeid } from '../src/scripts/utils/helpers.js';

/** 
 * @desc unit tests for the makeid.
 * The tests here are straightforward and focus on the length and uniqueness 
 * of the generated IDs.
 */
describe('makeid', () => {
    // verifies for length
    test('generate a random id of given length', () => {
        const id = makeid(5);
        expect(id).toHaveLength(5);
    });

    test('generate unique ids', () => {
        const id1 = makeid(5);
        const id2 = makeid(5);
        expect(id1).not.toEqual(id2);
    });

});


/** 
 * @desc Test suite for the convert1DArrayTo2D.
 * The tests here are straightforward and focus on different scenarios of 
 * converting 1D arrays to 2D arrays.
 */
describe('convert1DArrayTo2D', () => {
    test('convert 1D array to 2D array', () => {
        const array1D = [1, 2, 3, 4, 5, 6];
        const numCols = 2;
        const expected = [[1, 2], [3, 4], [5, 6]];
        expect(convert1DArrayTo2D(array1D, numCols)).toEqual(expected);
    });

    test('convert empty 1D array to empty 2D array', () => {
        const array1D = [];
        const numCols = 2;
        const expected = [];
        expect(convert1DArrayTo2D(array1D, numCols)).toEqual(expected);
    });

    test('convert 1D array to 2D array with incomplete rows', () => {
        const array1D = [1, 2, 3];
        const numCols = 2;
        const expected = [[1, 2], [3]];
        expect(convert1DArrayTo2D(array1D, numCols)).toEqual(expected);
    });

});