Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Auth routes
      post '/register', to: 'auth#register'
      post '/login', to: 'auth#login'
      get '/me', to: 'auth#me'

      # Comics routes
      resources :comics do
        resources :chapters, only: [:index, :show, :create, :update, :destroy] do
          resources :pages, only: [:create, :destroy] do
            collection do
              post :bulk_create
            end
          end
        end
        resources :comments, only: [:index, :create, :destroy]
      end

      # User management
      resources :users, only: [:index, :show, :update, :destroy] do
        member do
          post :ban
          post :unban
        end
      end

      # User-specific routes
      resources :bookmarks, only: [:index, :create, :destroy]
      resources :reading_histories, only: [:index, :create]
      resources :ratings, only: [:create]

      # Search
      get '/search', to: 'search#index'

      # Dashboard
      get '/dashboard/stats', to: 'dashboard#stats'
    end
  end

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check
end
