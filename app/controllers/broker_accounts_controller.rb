class BrokerAccountsController < ApplicationController
  before_action :set_broker_account, only: %i[show edit update destroy]

  def index
    @broker_accounts = BrokerAccount.all.order(created_at: :desc)
  end

  def show; end

  def edit; end

  def create
    @broker_account = BrokerAccount.new(broker_account_params)

    return turbo_stream if @broker_account.save

    render partial: 'new_edit_form', locals: { broker_account: @broker_account, description: 'Register Account' }
  end

  def update
    return turbo_stream if @broker_account.update(broker_account_params)

    render partial: 'new_edit_form', locals: { broker_account: @broker_account, description: 'Update account' }
  end

  def destroy
    @broker_account.destroy
    render turbo_stream: turbo_stream.remove(@broker_account)
  end

  private

  def set_broker_account
    @broker_account = BrokerAccount.find(params[:id])
  end

  def broker_account_params
    params.require(:broker_account).permit(:login, :description)
  end
end
