class CustomSelectField < ApplicationRecord
  attribute :choices, :string, default: ''

  validates :name, :choices, presence: true
  validate :choices_uniqueness

  private

  def choices_uniqueness
    choices_list = choices.split(";")
    return if choices_list.size == choices_list.uniq.size

    errors.add(:choices, "are not allowed to be duplicated")
  end
end
