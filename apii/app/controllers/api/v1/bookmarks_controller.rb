class Api::V1::BookmarksController < ApplicationController
  before_action :authorize_request

  def index
    @bookmarks = current_user.bookmarks.includes(chapter: :comic)
    render json: @bookmarks.as_json(include: { chapter: { include: :comic } })
  end

  def create
    @bookmark = current_user.bookmarks.find_or_initialize_by(chapter_id: params[:chapter_id])
    @bookmark.last_page = params[:last_page] if params[:last_page]

    if @bookmark.save
      render json: @bookmark, status: :created
    else
      render json: { errors: @bookmark.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @bookmark = current_user.bookmarks.find(params[:id])
    @bookmark.destroy
    head :no_content
  end
end
