import { FetchRequest } from "@rails/request.js"
import { formBody, mergeFormDataEntries } from "./tabulated-helpers"

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

    let url = new URL(this.form.action)
    let options = { responseKind: 'json' }

    // TODO: Now we are just sending the form, but we should send the filters/orders make to the table or shouldn't?
    const body = this.body()
    if (this.isIdempotent()) {
      url = mergeFormDataEntries(url, [...body.entries()])
    } else {
      options["body"] = body
    }

    const request = new FetchRequest(this.form.method, url, options)
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

  body () {
    return formBody(this.form)
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
