import Tabulator from "tabulator-tables"

function tabulatorFormatters () {
  return Tabulator.prototype.moduleBindings["format"].prototype.formatters
}

function formatMoney (cell, formatterParams, onRendered) {
  return tabulatorFormatters().money(cell, formatterParams, onRendered)
}

export function moneyBrl (cell, formatterParams, onRendered) {
  formatterParams = {
    decimal: ',',
    thousand: '.',
    symbol: "R$ ",
    symbolAfter: false,
    precision: 2
  }

  return formatMoney(cell, formatterParams, onRendered)
}

export function brazilianDate (cell, formatterParams, onRendered) {
  formatterParams = {
    inputFormat: "YYYY-MM-DD",
    outputFormat: "DD/MM/YYYY"
  }

  return tabulatorFormatters().datetime(cell, formatterParams, onRendered)
}
