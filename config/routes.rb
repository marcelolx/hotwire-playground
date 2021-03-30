Rails.application.routes.draw do
  resources :broker_accounts

  root to: 'broker_accounts#index'
end
