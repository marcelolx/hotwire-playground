class PeopleController < ApplicationController
  def index
    respond_to do |format|
      format.html do
        @table_config = TableColumnsConfig.find_by(identifier: 'tabulator-people-table') || TableColumnsConfig.new
      end

      format.json do
        @people = Person.page(permitted_params[:page]).per(15).where(build_where).order(build_order)
      end
    end
  end

  private

  def build_where
    search = permitted_params[:person]
    return {} unless search.present?

    # FIXME: This simple use case is only one field search, but there could be many
    Person.arel_table[search.keys.first].matches("%#{search.values.first}%")
  end

  def build_order
    sorters = permitted_params[:sorters]
    return {} unless sorters.present?

    sorters.values.map { |sorter| { "#{sorter['field']}": sorter['dir'] } }
  end

  def permitted_params
    params.permit(:page, person: {}, sorters: {})
  end
end
