Rails.application.routes.draw do
  resource :home, only: :index
  resources :broker_accounts
  resources :custom_select_fields
  resources :custom_select_field_choices, only: %i[new destroy], param: :choice
  resources :sortable_menu, only: %i[index update] do
    resources :sortable_sub_menu, only: :update
  end
  resources :people, only: :index
  resources :table_columns_config, only: %i[index update], param: :identifier

  root to: 'home#index'
end
