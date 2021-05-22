import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['editingBrokerAccount'];

  edit(event) {
    const brokerAccountId = this.editingBrokerAccountTarget.dataset.brokerAccountsId
    event.target.href = `${event.target.href}?editing_broker_account_id=${brokerAccountId}`
  }
}