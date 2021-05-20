import { Controller } from "stimulus"
import { Turbo } from "@hotwired/turbo-rails"

export default class extends Controller {
  static targets = ['editing_broker_account'];

  edit(event) {
    const broker_broker_account_id = this.editing_broker_accountTarget.dataset.brokerAccountId
    event.target.href = `${event.target.dataset.editPath}?editing_broker_account_id=${broker_broker_account_id}`
  }

  crazy_action(event) {
    event.preventDefault()

    const message = `<turbo-stream action="remove" target="broker_account_12"></turbo-stream>`

    Turbo.renderStreamMessage(message)
  }
}