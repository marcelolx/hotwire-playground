class PeopleController < ApplicationController
  def index
    @people = person_name ? Person.where('name LIKE ?', person_name) : Person.all
  end

  private

  def person_name
    person = params[:person]
    return unless person.present?
    return if person[:name].empty?

    "%#{person[:name]}%"
  end
end
