class TableColumnsConfig < ApplicationRecord
  before_save :calculate_digest

  private

  def calculate_digest
    self.digest = Digest::SHA1.hexdigest(config.to_json)
  end
end
