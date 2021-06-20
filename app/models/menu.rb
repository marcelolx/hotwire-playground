class Menu < ApplicationRecord
  has_many :sub_menus, -> { order(position: :asc) }, dependent: :destroy
  acts_as_list
end
