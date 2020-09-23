import { round } from "lodash";

/**
 * Calculate dimensions(Uses Arithmetic Progression)
 * @param {Number} n No of grid (column/row) the element would span
 * @param {Number} svgDimension svg rect dimension
 * @param {Number} difference difference between 2 svg rect
 * @returns dimension
 */
const calculateGridSize = (n, svgDimension = 92, difference = 116) => {
  return svgDimension + (n - 1) * difference;
};

// Custom Math.round function
const customRound = gridDecimalValue => {
  const DIVISOR = parseInt(gridDecimalValue) || 1; // 1 to avoid division by 0
  const result = gridDecimalValue % DIVISOR; // get the remainder
  const roundedOffNumber = round(result.toPrecision(2), 3);

  // rounding off with 0.4 as base value instead of 0.5
  if (roundedOffNumber < 0.4) {
    return Math.floor(gridDecimalValue);
  }
  return Math.ceil(gridDecimalValue);
};

/**
 * Calculate how many grids the element will take up
 * @returns exact no of grid the element should take up
 */
const calculateDimensionHandler = (currentWidth, difference = 116) => {
  const gridDecimalValue = currentWidth / difference;
  return customRound(gridDecimalValue);
};

export { calculateGridSize, calculateDimensionHandler };
