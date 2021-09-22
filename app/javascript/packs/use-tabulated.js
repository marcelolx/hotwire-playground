import { FetchRequest } from "@rails/request.js"
import { formBody, generateParamsList, mergeFormDataEntries } from "./tabulated-helpers"

export class UseTabulated {
  constructor (controller, table, form) {
    this.controller = controller
    this.table = table
    this.form = form
    this.submitCaptured = this.submitCaptured.bind(this)

    this.enhanceController()
    this.observe()
  }

  observe () {
    this.form.addEventListener('submit', this.submitCaptured)
  }

  unobserve () {
    this.form.removeEventListener('submit', this.submitCaptured)
    console.log('disconnected unobserve')
  }

  async submitCaptured (evt) {
    evt.preventDefault()

    const form = new FormData(this.form)
    let options = { responseKind: 'json' }

    // TODO: When filters being implemented we should send them too, at least I think
    const mapedSortList = this.table.modules.sort.sortList.map((e) => {
      return { field: e.field || e.column.field, dir: e.dir }
    })

    if (this.isIdempotent()) {
      const sortParamsList = generateParamsList({ sorters: mapedSortList })
      sortParamsList.forEach((param) => form.append(param.key, param.value))
      options['query'] = form
      //mergeFormDataEntries(url, [...body.entries()])
    } else {
      // TODO: If we support POST method then to send the sorters we need to do something like this
      // ----> body.set('sorters', JSON.stringify(rtt))
      //   OR
      // ----> const sortParamsList = generateParamsList({ sorters: mapedSortList })
      // ----> sortParamsList.forEach((param) => body.set(param.key, param.value))
      // But I'm not sure that it will come to the server as we expect, need to test it
      options['body'] = form
    }

    const request = new FetchRequest(this.form.method, this.form.action, options)
    const response = await request.perform()
    const responseBody = await response.json
    this.table.setData(responseBody.data)
    this.table.setMaxPage(responseBody.last_page)

    // TODO: Upstream to tabulator, today tabulator only triggers the page when the current page
    // is greater than the max pages and then the paginator isn't redrawed
    // this.table.modules.page.trigger() // TODO: This makes tabulator trigger an ajax request, not stonks
  }

  isIdempotent () {
    return this.form.method === 'get'
  }

  enhanceController () {
    const controllerDisconnect = this.controller.disconnect.bind(this.controller)
    const disconnect = () => {
      this.unobserve()
      controllerDisconnect()
    }
    Object.assign(this.controller, { disconnect })
  }
}

export const useTabulated = (controller, table, form) => {
  const observer = new UseTabulated(controller, table, form)
  return [observer.observe, observer.unobserve]
}
