class CreatePeople < ActiveRecord::Migration[6.1]
  def change
    create_table :people do |t|
      t.string :name
      t.string :cpf
      t.date :birthdate
      t.string :birth_location
      t.string :email
      t.string :country
      t.string :address
      t.string :district
      t.string :phone
      t.string :cellphone
      t.string :website

      t.timestamps
    end
  end
end
