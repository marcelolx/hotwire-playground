import { Controller } from "stimulus"
import { TurboStreamRequest } from '../packs/turbo_stream_request'

export default class extends Controller {
  static targets = ['editingCustomSelectField'];

  edit (event) {
    const customSelectFieldId = this.editingCustomSelectFieldTarget.dataset.customSelectFieldId
    event.target.href = `${event.target.href}?editing_custom_select_field_id=${customSelectFieldId}`
  }

  async addChoice (event) {
    const input = document.getElementById('choice-input-field')
    const targetDataSet = event.target.dataset
    const url = `${targetDataSet.url}?choice=${input.value}`
    const request = new TurboStreamRequest(targetDataSet.method, url)
    await request.perform()
  }

  removeChoice (_event) {

  }
}