/**
 * Sums the array of values and applies the provided precision.
 *
 * @param {Array<String | Number>} values
 * @param {Number} precision
 * @returns {String} The sum of the values
 */
function sum_with_precision (values, precision) {
  let output = 0

  if(values.length){
    values.forEach((value) => {
      value = Number(value)

      output += !isNaN(value) ? Number(value) : 0
    })
  }

  return output.toFixed(precision)
}

/**
 * Returns the sum of the values with 2 digits of precision.
 *
 * @param {Array<String | Number} values
 * @param {*} _data
 * @param {Object} _calcParams
 * @returns {String}
 */
export function sum_2_digits_precision (values, _data, _calcParams) {
  return sum_with_precision(values, 2)
}

/**
 * Returns the sum of the values with 4 digits of precision.
 *
 * @param {Array<String | Number} values
 * @param {*} _data
 * @param {Object} _calcParams
 * @returns {String}
 */
export function sum_4_digits_precision (values, _data, _calcParams) {
  return sum_with_precision(values, 4)
}
