class CustomSelectFieldsController < ApplicationController
  before_action :set_custom_select_field, only: %i[show edit update destroy]

  def index
    @custom_select_fields = CustomSelectField.all.order(created_at: :desc)
  end

  def show; end

  def edit; end

  def create
    @custom_select_field = CustomSelectField.new(custom_select_field_params)

    return turbo_stream if @custom_select_field.save

    render turbo_stream: turbo_stream.replace(
      @custom_select_field, partial: 'form', locals: { custom_select_field: @custom_select_field }
    )
  end

  def update
    return turbo_stream if @custom_select_field.update(custom_select_field_params)

    render partial: 'new_edit_form', locals: {
      custom_select_field: @custom_select_field, description: 'Update select field'
    }
  end

  def destroy
    @custom_select_field.destroy
    render turbo_stream: turbo_stream.remove(@custom_select_field)
  end

  private

  def set_custom_select_field
    @custom_select_field = CustomSelectField.find(params[:id])
  end

  def custom_select_field_params
    params.require(:custom_select_field).permit(:name, :choices)
  end
end
