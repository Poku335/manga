class Api::V1::ComicsController < ApplicationController
  before_action :authorize_request, except: [:index, :show]
  before_action :set_comic, only: [:show, :update, :destroy]
  before_action :authorize_admin, only: [:create, :update, :destroy]

  def index
    @comics = Comic.published.includes(:chapters).page(params[:page]).per(20)
    render json: @comics.as_json(
      include: { chapters: { only: [:id, :chapter_number, :title] } },
      methods: [:average_rating]
    )
  end

  def show
    @comic.increment_views!
    render json: @comic.as_json(
      include: {
        chapters: { only: [:id, :chapter_number, :title, :published_at], methods: [] }
      },
      methods: [:average_rating]
    )
  end

  def create
    @comic = current_user.comics.build(comic_params)
    if @comic.save
      render json: @comic, status: :created
    else
      render json: { errors: @comic.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @comic.update(comic_params)
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
    params.require(:comic).permit(:title, :description, :author, :status, :cover_image)
  end

  def authorize_admin
    render json: { error: 'Unauthorized' }, status: :forbidden unless current_user&.admin?
  end
end
