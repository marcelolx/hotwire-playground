import { Controller } from "stimulus"
import { TurboStreamRequest } from '../packs/turbo_stream_request'

export default class extends Controller {
  static targets = ['editingCustomSelectField', 'choiceInputField', 'choices'];

  edit (event) {
    const customSelectFieldId = this.editingCustomSelectFieldTarget.dataset.customSelectFieldsId
    event.target.href = `${event.target.href}?editing_custom_select_field_id=${customSelectFieldId}`
  }

  async addChoice (event) {
    const targetDataSet = event.target.dataset
    const queryParams = `choice=${this.choiceInputFieldTarget.value}&choices=${encodeURIComponent(this.choicesTarget.value)}`
    const url = `${targetDataSet.url}?${queryParams}`
    const request = new TurboStreamRequest(targetDataSet.method, url)
    await request.perform()
  }

  async removeChoice (event) {
    const targetDataSet = event.currentTarget.dataset
    const request = new TurboStreamRequest(targetDataSet.method, targetDataSet.url)
    await request.perform()
  }
}