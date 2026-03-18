Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      post '/register', to: 'auth#register'
      post '/login', to: 'auth#login'
      get '/me', to: 'auth#me'


      resources :comics do
        collection do
          get :popular
          get :trending
          get :by_genre
        end
        resources :chapters, only: [:index, :show, :create, :update, :destroy] do
          resources :pages, only: [:create, :destroy] do
            collection do
              post :bulk_create
            end
          end
        end
        resources :comments, only: [:index, :create, :destroy]
      end


      resources :genres, only: [:index, :show]


      resources :users, only: [:index, :show, :update, :destroy] do
        member do
          post :ban
          post :unban
        end
      end


      resources :bookmarks, only: [:index, :create, :destroy]
      resources :reading_histories, only: [:index, :create]
      resources :ratings, only: [:create]


      get '/search', to: 'search#index'


      get '/dashboard/stats', to: 'dashboard#stats'
    end
  end


  get "up" => "rails/health#show", as: :rails_health_check
end
