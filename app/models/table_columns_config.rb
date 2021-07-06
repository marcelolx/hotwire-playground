class TableColumnsConfig < ApplicationRecord
  before_save :calculate_digest

  private

  def calculate_digest
    maped_config = config.map { |el| el.keys.map { |key| "#{key}:#{el[key]}" }.join('::') }.join('|')
    self.digest = Digest::SHA1.hexdigest(maped_config)
  end
end
