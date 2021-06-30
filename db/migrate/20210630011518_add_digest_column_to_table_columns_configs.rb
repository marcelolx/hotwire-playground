class AddDigestColumnToTableColumnsConfigs < ActiveRecord::Migration[6.1]
  def change
    add_column :table_columns_configs, :digest, :string
  end
end
