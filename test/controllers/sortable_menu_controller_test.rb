require "test_helper"

class SortableMenuControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get sortable_menu_index_url
    assert_response :success
  end
end
