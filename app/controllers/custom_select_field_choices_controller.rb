class CustomSelectFieldChoicesController < ApplicationController
  def new
    @choices = list_of_choices_with_added_choice
    return turbo_stream if params[:choice].present?

    render turbo_stream: turbo_stream.replace(
      'choice-form',
      partial: 'custom_select_fields/choice_form', locals: { error: 'Provide a choice name' }
    )
  end

  def destroy
    @choices = list_of_choices_without_deleted_choice
    turbo_stream
  end

  private

  def list_of_choices_with_added_choice
    return params[:choice] if params[:choices].empty?

    "#{params[:choices]};#{params[:choice]}"
  end

  def list_of_choices_without_deleted_choice
    return "" if params[:choices].empty?

    choices = params[:choices].split(";")
    choices.delete(params[:choice])
    choices.join(";")
  end
end
