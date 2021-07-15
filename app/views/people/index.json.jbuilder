json.last_page @people.total_pages
json.data @people, :name, :cpf, :birthdate, :birth_location, :email, :country, :address, 
          :district, :phone, :cellphone, :website, :credit
