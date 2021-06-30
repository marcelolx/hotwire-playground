import { Controller } from "stimulus"
import Tabulator from "tabulator-tables"
import { get, patch } from "@rails/request.js"

export default class extends Controller {
  static values = { digest: String }

  initialize () {
    this.persistTableConfig = this.persistTableConfig.bind(this)
    this.readTableConfig = this.readTableConfig.bind(this)
  }

  connect () {
    // TODO: We need to load al tr/th elements and just allow call persist if the data
    // contains an array with the number of header columns + 1
    this.table = new Tabulator("#people-table", {
      layout: "fitColumns",
      persistenceID: "people-table",
      persistence: {
        columns: ["visible"],
      },
      responsiveLayout: true,
      persistenceWriterFunc: this.persistTableConfig,
      persistenceReaderFunc: this.readTableConfig,
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

  disconnect () {
    this.table.destroy()
    this.table = undefined
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
    console.log("persist")
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
    const storedKey = `${id}-${type}`
    const digest = localStorage.getItem(`${storedKey}-digest`)
    if (this.digestValue == digest) {
      console.log('loading local config')
      const config = localStorage.getItem(storedKey)
      return JSON.parse(config)
    }

    this.loadTableConfig(id, type)
    return false
  }

  async loadTableConfig (id, type) {
    console.log('loadTableConfig')
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

  storeTableConfig (id, type, body) {
    const storageKey = id + '-' + type;
    localStorage.setItem(storageKey, JSON.stringify(body.data))
    localStorage.setItem(storageKey + '-digest', body.digest)
  }

  updateTableDigest (digest) {
    this.digestValue = digest
  }
}
