class ApplicationForm
  include ActiveModel::Model
  include ActiveModel::Attributes
  include ActiveModel::Validations::Callbacks

  def self.model_name
    ActiveModel::Name.new(self, nil, form_model_name)
  end

  def self.form_model_name; end
end