import Tabulator from "tabulator-tables"
import { sum_2_digits_precision, sum_4_digits_precision } from "./tabulated-calculation-functions"

export function setupTabulated () {
  extendColumnCalculations()
}
function extendColumnCalculations () {
  Tabulator.prototype.extendModule('columnCalcs', 'calculations', {
    'sum_2_digits_precision': sum_2_digits_precision,
    'sum_4_digits_precision': sum_4_digits_precision,
  })
}
