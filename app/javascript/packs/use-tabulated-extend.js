import Tabulator from "tabulator-tables"
import { sum_2_digits_precision, sum_4_digits_precision } from "./tabulated-calculation"
import { brazilianDate, moneyBrl } from "./tabulated-formatter"

// Tabulator depends on Moment.JS
import moment from 'moment';
window.moment = moment

export function setupTabulated () {
  extendColumnCalculations()
  extendFormatters()
}

function extendColumnCalculations () {
  Tabulator.prototype.extendModule('columnCalcs', 'calculations', {
    'sum_2_digits_precision': sum_2_digits_precision,
    'sum_4_digits_precision': sum_4_digits_precision,
  })
}

function extendFormatters () {
  Tabulator.prototype.extendModule('format', 'formatters', {
    "moneyBrl": moneyBrl,
    "brazilianDate": brazilianDate
  })
}
