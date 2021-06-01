class CustomSelectFieldChoicesController < ApplicationController
  before_action :set_choices_form

  def new
    if @form.valid?
      @choices = @form.list_of_choices_with_added_choice
      return turbo_stream
    end

    render turbo_stream: turbo_stream.replace(
      'choice-form',
      partial: 'custom_select_fields/choice_form', locals: { error: @form.errors.values.join('<br>') }
    )
  end

  def destroy
    @choices = @form.list_of_choices_without_deleted_choice
    turbo_stream
  end

  private

  def set_choices_form
    @form = CustomSelectFieldChoicesForm.new(params.permit(:choice, :choices))
  end
end
