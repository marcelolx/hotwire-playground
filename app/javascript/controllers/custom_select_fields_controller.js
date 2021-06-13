import { Controller } from "stimulus"
import { performTurboStreamRequest } from '../packs/turbo_stream_request'

export default class extends Controller {
  static targets = ['editingCustomSelectField', 'choiceInputField', 'choices'];

  edit (event) {
    const customSelectFieldId = this.editingCustomSelectFieldTarget.dataset.customSelectFieldsId
    event.target.href = `${event.target.href}?editing_custom_select_field_id=${customSelectFieldId}`
  }

  async addChoice (event) {
    const targetDataSet = event.target.dataset
    const url = this.newURL(targetDataSet)
    url.searchParams.append('choice', this.choiceInputFieldTarget.value)
    url.searchParams.append('choices', this.choicesTarget.value)
    await performTurboStreamRequest(targetDataSet.method, url)
  }

  async removeChoice (event) {
    const targetDataSet = event.currentTarget.dataset
    const url = this.newURL(targetDataSet)
    url.searchParams.append('choices', this.choicesTarget.value)
    await performTurboStreamRequest(targetDataSet.method, url)
  }

  newURL (targetDataSet) {
    return new URL(targetDataSet.href, window.location.origin)
  }
}
