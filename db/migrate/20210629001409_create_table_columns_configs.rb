class CreateTableColumnsConfigs < ActiveRecord::Migration[6.1]
  def change
    create_table :table_columns_configs do |t|
      t.string :identifier
      t.json :config

      t.timestamps
    end
  end
end
