class Api::V1::ComicsController < ApplicationController
  before_action :authorize_request, except: [:index, :show, :popular, :trending, :by_genre]
  before_action :set_comic, only: [:show, :update, :destroy]
  before_action :authorize_admin, only: [:create, :update, :destroy]

  def index
    comics = Comic.published.includes(:chapters, :genres)
    

    if params[:genre].present?
      comics = comics.by_primary_genre(params[:genre])
    end
    

    case params[:sort]
    when 'trending'
      comics = comics.trending
    when 'recent'
      comics = comics.recent
    when 'popular'
      comics = comics.popular
    else
      comics = comics.recent
    end
    
    @comics = comics.page(params[:page]).per(20)
    render json: @comics.as_json(
      include: { 
        chapters: { only: [:id, :chapter_number, :title] },
        genres: { only: [:id, :name] }
      },
      methods: [:average_rating],
      only: [:id, :title, :description, :author, :cover_image, :views_count, :bookmarks_count, :average_rating, :primary_genre, :secondary_genre]
    )
  end

  def show
    @comic.increment_views!
    render json: @comic.as_json(
      include: {
        chapters: { only: [:id, :chapter_number, :title, :published_at] },
        genres: { only: [:id, :name] }
      },
      methods: [:average_rating]
    )
  end

  def popular
    @comics = Comic.published.popular.includes(:genres).limit(20)
    render json: @comics.as_json(
      include: { genres: { only: [:id, :name] } },
      methods: [:average_rating],
      only: [:id, :title, :description, :author, :cover_image, :views_count, :bookmarks_count, :average_rating]
    )
  end

  def trending
    @comics = Comic.published.trending.includes(:genres).limit(20)
    render json: @comics.as_json(
      include: { genres: { only: [:id, :name] } },
      methods: [:average_rating],
      only: [:id, :title, :description, :author, :cover_image, :views_count, :bookmarks_count, :average_rating, :ratings_count]
    )
  end

  def by_genre
    @comics = Comic.published.by_primary_genre(params[:genre]).includes(:genres).page(params[:page]).per(20)
    render json: @comics.as_json(
      include: { genres: { only: [:id, :name] } },
      methods: [:average_rating],
      only: [:id, :title, :description, :author, :cover_image, :views_count, :bookmarks_count, :average_rating]
    )
  end

  def create
    @comic = current_user.comics.build(comic_params)
    if @comic.save

      if params[:genre_ids].present?
        @comic.genres = Genre.where(id: params[:genre_ids])
      end
      render json: @comic, status: :created
    else
      render json: { errors: @comic.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @comic.update(comic_params)

      if params[:genre_ids].present?
        @comic.genres = Genre.where(id: params[:genre_ids])
      end
      render json: @comic
    else
      render json: { errors: @comic.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comic.destroy
    head :no_content
  end

  private

  def set_comic
    @comic = Comic.find(params[:id])
  end

  def comic_params
    params.require(:comic).permit(:title, :description, :author, :status, :cover_image, :primary_genre, :secondary_genre)
  end

  def authorize_admin
    render json: { error: 'Unauthorized' }, status: :forbidden unless current_user&.admin?
  end
end
