import { Controller } from "stimulus"
import Sortable from 'sortablejs'
import { patch } from "@rails/request.js"

export default class extends Controller {
  static targets = ["nestedMenu"]

  initialize () {
    this.onEnd = this.onEnd.bind(this)
    this.onEndNested = this.onEndNested.bind(this)
    this.onStartNested = this.onStartNested.bind(this)
    this.endEndUpdate = this.endEndUpdate.bind(this)
  }

  connect () {
    this.sortable = new Sortable(this.element, this.options)
    this.nestedSortable = []
    this.nestedMenuTargets.forEach((nestedMenu) => {
      this.nestedSortable.push(new Sortable(nestedMenu, this.nestedOptions(nestedMenu.id)))
    })
  }

  disconnect () {
    this.sortable.destroy()
    this.sortable = undefined
    this.nestedSortable.forEach((nestedMenu) => { nestedMenu.destroy() })
    this.nestedSortable = undefined
  }

  endEndUpdate (item, newIndex) {
    if (!item.dataset.sortableUpdateUrl) return

    const resourceName = item.dataset.resourceName
    const paramName = 'position'
    const param = resourceName ? `${resourceName}[${paramName}]` : paramName

    const data = new FormData()
    data.append(param, newIndex + 1)

    patch(item.dataset.sortableUpdateUrl, { body: data })
  }

  onEnd ({ item, newIndex }) {
    this.endEndUpdate(item, newIndex)
  }

  onEndNested ({ item, newIndex }) {
    this.sortable.option('disable', false)
    this.endEndUpdate(item, newIndex)
  }

  onStartNested (_evt) {
    this.sortable.option('disable', true)
  }

  get options () {
    return {
      animation: 150,
      onEnd: this.onEnd
    }
  }

  nestedOptions (id) {
    return {
      animation: 150,
      group: `nested-${id}`,
      fallbackOnBody: true,
		  swapThreshold: 0.65,
      onEnd: this.onEndNested,
      onStart: this.onStartNested
    }
  }
}
