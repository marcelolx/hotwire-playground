class CustomSelectField < ApplicationRecord
  attribute :choices, :string, default: ''

  validates :name, :choices, presence: true
end
