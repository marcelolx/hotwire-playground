require "application_system_test_case"

class BrokerAccountsTest < ApplicationSystemTestCase
  setup do
    @broker_account = broker_accounts(:one)
  end

  test "visiting the index" do
    visit broker_accounts_url
    assert_selector "h1", text: "Broker Accounts"
  end

  test "creating a Broker account" do
    visit broker_accounts_url
    click_on "New Broker Account"

    fill_in "Description", with: @broker_account.description
    fill_in "Login", with: @broker_account.login
    click_on "Create Broker account"

    assert_text "Broker account was successfully created"
    click_on "Back"
  end

  test "updating a Broker account" do
    visit broker_accounts_url
    click_on "Edit", match: :first

    fill_in "Description", with: @broker_account.description
    fill_in "Login", with: @broker_account.login
    click_on "Update Broker account"

    assert_text "Broker account was successfully updated"
    click_on "Back"
  end

  test "destroying a Broker account" do
    visit broker_accounts_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Broker account was successfully destroyed"
  end
end
