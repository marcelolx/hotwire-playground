class CustomSelectFieldChoicesForm < ApplicationForm
  attribute :choice
  attribute :choices, default: ''

  validates :choice, presence: true
  validate :choice_uniqueness

  def self.form_model_name
    "CustomSelectFieldChoicesForm"
  end

  def list_of_choices_with_added_choice
    return choice if choices.empty?

    "#{choices};#{choice}"
  end

  def list_of_choices_without_deleted_choice
    return "" if choices.empty?

    choices_list = choices.split(";")
    choices_list.delete_at(choices_list.find_index(choice))
    choices_list.join(";")
  end

  private

  def choice_uniqueness
    return unless choices.split(";").include?(choice)

    errors.add(:base, "Choice '#{choice}' already exists")
  end
end