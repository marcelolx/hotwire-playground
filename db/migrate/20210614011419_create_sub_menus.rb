class CreateSubMenus < ActiveRecord::Migration[6.1]
  def change
    create_table :sub_menus do |t|
      t.string :name
      t.integer :position
      t.references :menu, null: false, foreign_key: true

      t.timestamps
    end
  end
end
