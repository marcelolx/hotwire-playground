import Tabulator from "tabulator-tables"
import { tabulatorExtractOptions } from "./tabulated-helpers"

export function registerTabulatorOverrides () {
  Tabulator.prototype.moduleBindings["htmlTableImport"].prototype["_extractOptions"] = tabulatorExtractOptions
}

