class SortableMenuController < ApplicationController
  def index
    @menus = Menu.includes(:sub_menus).all.order(position: :asc).to_a
  end

  def update
    Menu.find(params[:id]).update(position: menu_params[:position])
  end

  private

  def menu_params
    params.require(:menu).permit(:position)
  end
end
