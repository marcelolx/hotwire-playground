import { Controller } from "stimulus"
import Tabulator from "tabulator-tables"
import { get, patch } from "@rails/request.js"
const sha1 = require("js-sha1")

export default class extends Controller {
  static values = { digest: String, url: String }

  initialize () {
    this.persistTableConfig = this.persistTableConfig.bind(this)
    this.readTableConfig = this.readTableConfig.bind(this)
    this.tableTotalHeaders = this.countTableHeaders()
    this.canPersistConfig = false
  }

  connect () {
    this.loadTableConfig('tabulator-people-table', 'columns')
    this.table = this.setupTabulator()
  }

  disconnect () {
    this.table.destroy()
    this.table = undefined
  }

  countTableHeaders () {
    const trIndex = 0
    const thCount = this.element.children["people-table"].children["people-table-header"].children[trIndex].childElementCount
    return thCount + 1
  }

  setupTabulator () {
    return new Tabulator("#people-table", {
      layout: "fitColumns",
      persistenceID: "people-table",
      persistence: {
        columns: ["visible"],
      },
      responsiveLayout: true,
      persistenceWriterFunc: this.persistTableConfig,
      persistenceReaderFunc: this.readTableConfig,
      pagination: "remote",
      ajaxURL: this.urlValue,
      ajaxSorting: true,
      columns: [
        {
          field: "#",
          headerSort: false,
          cssClass: 'menu-header',
          width: 40,
          print: false,
          resizable: false,
          headerMenu: this.headerMenu
        }
      ]
    })
  }

  headerMenu () {
    const menu = []
    const columns = this.getColumns().filter((column) => column.getField() != "#")

    for (const column of columns) {
      const icon = document.createElement("i")
      icon.classList.add('bi')

      icon.classList.add(column.isVisible() ? 'bi-check-square' : 'bi-square')

      const label = document.createElement("span");
      const title = document.createElement("span");

      title.textContent = " " + column.getDefinition().title;

      label.appendChild(icon);
      label.appendChild(title);

      menu.push({
        label: label,
        action: (evt) => {
          evt.stopPropagation()

          column.toggle()

          if (column.isVisible()) {
            icon.classList.remove("bi-square");
            icon.classList.add("bi-check-square");
          } else {
            icon.classList.remove("bi-check-square");
            icon.classList.add("bi-square");
          }

          column.getTable().redraw()
        }
      })
    }

    return menu
  }

  async persistTableConfig (id, type, data) {
    if (!this.canPersistConfig) {
      this.canPersistConfig = data.length == this.tableTotalHeaders
      return
    }

    if (this.calculateConfigDigest(data) == this.digestValue)
      return

    const body = { type: type, data: data }
    const response = await patch(`/table_columns_config/${id}`, { body: JSON.stringify(body), responseKind: 'json' })
    if (response.ok) {
      const body = await response.json
      this.storeTableConfig(id, type, { data: data, digest: body.digest })
      this.updateTableDigest(body.digest)
    } else {
      // TODO: Maybe dispatch a callback and allow the application handle when config isn't persisted?
    }
  }

  readTableConfig (id, type) {
    const storedKey = this.tableConfigKey(id, type)
    const digest = localStorage.getItem(`${storedKey}-digest`)
    if (this.digestValue == digest) {
      console.log('loading local config')
      return this.readStoredConfig(storedKey)
    }

    return false
  }

  readStoredConfig (storedKey) {
    const config = localStorage.getItem(storedKey)
    return JSON.parse(config)
  }

  async loadTableConfig (id, type) {
    const storageKey = this.tableConfigKey(id, type);
    if (this.calculateStoredConfigDigest(storageKey) == this.digestValue)
      return

    const url = new URL('/table_columns_config', window.location.origin)
    url.searchParams.append('identifier', id)
    url.searchParams.append('type', type)
    const response = await get(url, { responseKind: 'json' })
    if (response.ok) {
      const body = await response.json
      this.storeTableConfig(id, type, body)
      this.updateTableDigest(body.digest)
    }
  }

  calculateStoredConfigDigest (storedKey) {
    const config = this.readStoredConfig(storedKey)
    return this.calculateConfigDigest(config)
  }

  calculateConfigDigest (config) {
    const maped_config = config.map(el => Object.keys(el).map(key => `${key}:${el[key]}` ).join("::") ).join("|")
    return sha1(maped_config)
  }

  storeTableConfig (id, type, body) {
    const storageKey = this.tableConfigKey(id, type);
    localStorage.setItem(storageKey, JSON.stringify(body.data))
    localStorage.setItem(storageKey + '-digest', body.digest)
  }

  tableConfigKey (id, type) {
    return id + '-' + type
  }

  updateTableDigest (digest) {
    this.digestValue = digest
  }
}
