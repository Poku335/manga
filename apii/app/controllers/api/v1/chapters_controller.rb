class Api::V1::ChaptersController < ApplicationController
  before_action :authorize_request, except: [:index, :show]
  before_action :set_comic
  before_action :set_chapter, only: [:show, :update, :destroy]
  before_action :authorize_admin, only: [:create, :update, :destroy]

  def index
    @chapters = @comic.chapters.published.ordered
    render json: @chapters
  end

  def show
    render json: @chapter.as_json(include: { pages: { only: [:id, :page_number, :image_url] } })
  end

  def create
    @chapter = @comic.chapters.build(chapter_params)
    if @chapter.save
      render json: @chapter, status: :created
    else
      render json: { errors: @chapter.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @chapter.update(chapter_params)
      render json: @chapter
    else
      render json: { errors: @chapter.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @chapter.destroy
    head :no_content
  end

  private

  def set_comic
    @comic = Comic.find(params[:comic_id])
  end

  def set_chapter
    @chapter = @comic.chapters.find(params[:id])
  end

  def chapter_params
    params.require(:chapter).permit(:chapter_number, :title, :published_at)
  end

  def authorize_admin
    render json: { error: 'Unauthorized' }, status: :forbidden unless current_user&.admin?
  end
end
