require "test_helper"

class CustomSelectFieldChoicesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get custom_select_field_choices_new_url
    assert_response :success
  end

  test "should get delete" do
    get custom_select_field_choices_delete_url
    assert_response :success
  end
end
