import { FetchRequest } from '@rails/request.js'

export class TurboStreamRequest {
  constructor (method, url, options = {}) {
    this.method = method
    this.url = url
    this.options =  { ...this.fetchOptions(), ...options }
  }

  async perform () {
    const request = new FetchRequest(this.method, this.url, this.options)
    const response = await request.perform()

    return response;
  }

  fetchOptions () {
    return { responseKind: "turbo-stream" }
  }
}
