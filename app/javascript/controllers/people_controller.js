import { Controller } from "stimulus"
import Tabulator from "tabulator-tables"

export default class extends Controller {
  initialize () {
    //this.headerMenu = this.headerMenu.bind(this)
  }

  connect () {
    this.table = new Tabulator("#people-table", {
      layout: "fitColumns",
      responsiveLayout: true,
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
    let menu = []
    const columns = this.getColumns().filter((column) => column.getField() != "#")
    
    for (const column of columns) {
      const icon = document.createElement("i")
      icon.classList.add('bi')
      icon.classList.add(column.isVisible() ? 'bi-check-square' : 'square')

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
        }
      })
    }

    return menu
  }
}
