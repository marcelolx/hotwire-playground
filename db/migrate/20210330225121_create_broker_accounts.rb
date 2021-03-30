class CreateBrokerAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :broker_accounts do |t|
      t.integer :login
      t.string :description

      t.timestamps
    end
  end
end
