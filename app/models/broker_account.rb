class BrokerAccount < ApplicationRecord
  validates :login, :description, presence: true
  validates :login, length: { maximum: 19 }
end
