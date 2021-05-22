Rails.application.routes.draw do
  resource :home, only: :index
  resources :broker_accounts
  resources :custom_select_fields
  resources :custom_select_field_choices, only: %i[new destroy], param: :choice

  root to: 'home#index'
end
