// utils/formatters.js

/**
 * Formats a number with commas according to the Indian numbering system.
 * @param {number} number - The number to format.
 * @returns {string} The formatted number string.
 */
export const formatIndianNumber = (number) => {
  if (typeof number !== 'number' || isNaN(number) || number === null) {
    return ''; // Return an empty string or handle the error as needed
  }
  return new Intl.NumberFormat('en-IN').format(number);
};