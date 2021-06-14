import { Controller } from "stimulus"
import Sortable from 'sortablejs'

export default class extends Controller {
  initialize () {
    this.onEnd = this.onEnd.bind(this)
  }

  connect () {
    this.sortable = new Sortable(this.element, this.options)
  }

  onEnd ({ item, newIndex }) {
    console.log(item)
    console.log(newIndex)
  }

  get options () {
    return {
      animation: 150,
      onEnd: this.onEnd
    }
  }
}