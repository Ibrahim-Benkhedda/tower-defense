
/**
 * Convert a 1D array to a 2D array.
 * @param {Array} array1D - The 1D array to convert.
 * @param {number} numCols - The number of columns in the 2D array.
 * @returns {Array} - The converted 2D array.
 */
export function convert1DArrayTo2D(array1D, numCols) {
    const array2D = [];
    for (let i = 0; i < array1D.length; i += numCols) {
        array2D.push(array1D.slice(i, i + numCols));
    }

    return array2D;
}


export function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

export function isWithinRadius(x1, y1, x2, y2, radius) {
    return calculateDistance(x1, y1, x2, y2) <= radius;
}