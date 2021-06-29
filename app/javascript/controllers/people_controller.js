import { Controller } from "stimulus"
import Tabulator from "tabulator-tables"
import { patch } from "@rails/request.js"

export default class extends Controller {
  initialize () {
    this.persistTableConfig = this.persistTableConfig.bind(this)
    this.readTableConfig = this.readTableConfig.bind(this)
  }

  connect () {
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

  persistTableConfig (id, type, data) {
    console.log('read')
    console.log(id)
    console.log(type)
    console.log(data)
    const body = { identifier: id, type: type, data: data }
    patch('/table_columns_config', { body: JSON.stringify(body) })
  }

  readTableConfig (id, type) {
    // TODO: Compute a digest for the stored config and when rendering the table include this digest as an
    // html data-attribute to allow access it easily with stimulus value api and compare it with the digest stored
    // in the localstorage, if the digest matches uses the stored config, otherwise fetches the config from the server
    console.log('read')
    console.log(id)
    console.log(type)
  }
}
