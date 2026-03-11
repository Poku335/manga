class Api::V1::ReadingHistoriesController < ApplicationController
  before_action :authorize_request

  def index
    @histories = current_user.reading_histories.includes(comic: :chapters, last_chapter: :comic)
    render json: @histories.as_json(
      include: {
        comic: { only: [:id, :title, :cover_image] },
        last_chapter: { only: [:id, :chapter_number, :title] }
      }
    )
  end

  def create
    @history = current_user.reading_histories.find_or_initialize_by(comic_id: params[:comic_id])
    @history.last_chapter_id = params[:last_chapter_id] if params[:last_chapter_id]

    if @history.save
      render json: @history, status: :created
    else
      render json: { errors: @history.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
