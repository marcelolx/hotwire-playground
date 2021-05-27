class CustomSelectFieldChoicesController < ApplicationController
  def new
    return turbo_stream if params[:choice].present?

    render turbo_stream: turbo_stream.replace(
      'choice-form',
      partial: 'custom_select_fields/choice_form', locals: { error: 'Provide a choice name' }
    )
  end

  def destroy
    render turbo_stream: turbo_stream.remove("choice-#{params[:choice]}")
  end
end
