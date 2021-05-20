import { Controller } from "stimulus"
import { Turbo } from "@hotwired/turbo-rails"

export default class extends Controller {
  static targets = ['editingBrokerAccount'];

  edit(event) {
    const brokerAccountId = this.editingBrokerAccountTarget.dataset.brokerAccountsId
    event.target.href = `${event.target.href}?editing_broker_account_id=${brokerAccountId}`
  }

  crazy_action(event) {
    event.preventDefault()

    const message = `<turbo-stream action="remove" target="broker_account_11"></turbo-stream>`

    Turbo.renderStreamMessage(message)
  }
}