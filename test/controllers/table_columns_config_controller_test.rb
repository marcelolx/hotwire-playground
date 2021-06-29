require "test_helper"

class TableColumnsConfigControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get table_columns_config_create_url
    assert_response :success
  end
end
