class CreateCustomSelectFields < ActiveRecord::Migration[6.1]
  def change
    create_table :custom_select_fields do |t|
      t.string :name
      t.text :choices

      t.timestamps
    end
  end
end
