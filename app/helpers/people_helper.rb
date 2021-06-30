module PeopleHelper
  def column_visible(name)
    field = (@table_config.config || []).find { |el| el["field"] == name }
    return true unless field

    field["visible"]
  end
end
