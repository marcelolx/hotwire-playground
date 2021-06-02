import { Request } from '@rails/request.js'
import { Turbo } from "@hotwired/turbo-rails"

export class TurboStreamRequest {
  constructor (method, url, options = {}) {
    this.method = method
    this.url = url
    this.options =  { ...this.fetchOptions(), ...options }
  }

  async perform () {
    const request = new Request(this.method, this.url, this.options)
    const response = await request.perform()
    if (response.ok) {
      Turbo.renderStreamMessage(await response.text)
    }

    return response;
  }

  fetchOptions () {
    return { responseKind: "turbo-stream" }
  }
}
