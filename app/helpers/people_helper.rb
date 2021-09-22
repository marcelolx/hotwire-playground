module PeopleHelper
  def column_visible(name, default = true)
    field = (@table_config.config || []).find { |el| el["field"] == name }
    return default unless field

    field["visible"]
  end
end
