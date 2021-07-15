class PeopleAddCreditColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :people, :credit, :decimal, precision: 10, scale: 2
  end
end
