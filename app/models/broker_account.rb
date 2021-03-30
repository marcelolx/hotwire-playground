class BrokerAccount < ApplicationRecord
  validates :login, :description, presence: true
end
