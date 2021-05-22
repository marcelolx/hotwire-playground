Rails.application.routes.draw do
  resource :home, only: :index
  resources :broker_accounts

  root to: 'home#index'
end
