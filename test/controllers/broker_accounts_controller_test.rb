require "test_helper"

class BrokerAccountsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @broker_account = broker_accounts(:one)
  end

  test "should get index" do
    get broker_accounts_url
    assert_response :success
  end

  test "should get new" do
    get new_broker_account_url
    assert_response :success
  end

  test "should create broker_account" do
    assert_difference('BrokerAccount.count') do
      post broker_accounts_url, params: { broker_account: { description: @broker_account.description, login: @broker_account.login } }
    end

    assert_redirected_to broker_account_url(BrokerAccount.last)
  end

  test "should show broker_account" do
    get broker_account_url(@broker_account)
    assert_response :success
  end

  test "should get edit" do
    get edit_broker_account_url(@broker_account)
    assert_response :success
  end

  test "should update broker_account" do
    patch broker_account_url(@broker_account), params: { broker_account: { description: @broker_account.description, login: @broker_account.login } }
    assert_redirected_to broker_account_url(@broker_account)
  end

  test "should destroy broker_account" do
    assert_difference('BrokerAccount.count', -1) do
      delete broker_account_url(@broker_account)
    end

    assert_redirected_to broker_accounts_url
  end
end
