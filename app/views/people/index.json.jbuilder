json.last_page @people.total_pages
json.data json.array @people, :name, :cpf, :birthdate, :birth_location, :email, :country, :address, :district, :phone, :cellphone, :website