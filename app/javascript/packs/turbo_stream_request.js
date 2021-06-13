import { FetchRequest } from '@rails/request.js'

async function performTurboStreamRequest (method, url, options) {
  const fetchOptions = { responseKind: 'turbo-stream' }
  const request = new FetchRequest(method, url, { ...fetchOptions, ...options })
  return await request.perform()
}

export { performTurboStreamRequest }
