class SortableSubMenuController < ApplicationController
  def update
    Menu.find(params[:sortable_menu_id]).sub_menus.find(params[:id]).update(position: sub_menu_params[:position])
  end

  private

  def sub_menu_params
    params.require(:sub_menu).permit(:position)
  end
end
