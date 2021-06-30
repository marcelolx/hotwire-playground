class TableColumnsConfigController < ApplicationController
  def index
    columns_config = TableColumnsConfig.find_by(identifier: permitted_params[:identifier])

    respond_to do |format|
      format.json { render json: { data: columns_config.config, digest: columns_config.digest }.to_json }
    end
  end

  def update
    columns_config = TableColumnsConfig.where(identifier: permitted_params[:identifier]).first_or_initialize
    columns_config.config = permitted_params[:data]

    respond_to do |format|
      if columns_config.save
        format.json { render json: { digest: columns_config.digest }.to_json }
      else
        format.json { head :unprocessable_entity }
      end
    end
  end

  private

  def permitted_params
    params.permit(:identifier, :type, data: %i[field visible])
  end
end
