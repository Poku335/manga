class Api::V1::PagesController < ApplicationController
  before_action :authorize_request
  before_action :authorize_admin
  before_action :set_chapter

  def create
    @page = @chapter.pages.build(page_params)
    if @page.save
      render json: @page, status: :created
    else
      render json: { errors: @page.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def bulk_create
    pages_data = params[:pages] || []
    pages = []

    pages_data.each do |page_data|
      pages << @chapter.pages.build(
        page_number: page_data[:page_number],
        image_url: page_data[:image_url]
      )
    end

    if pages.all?(&:save)
      render json: pages, status: :created
    else
      render json: { errors: 'Failed to create pages' }, status: :unprocessable_entity
    end
  end

  def destroy
    @page = @chapter.pages.find(params[:id])
    @page.destroy
    head :no_content
  end

  private

  def set_chapter
    @chapter = Chapter.find(params[:chapter_id])
  end

  def page_params
    params.require(:page).permit(:page_number, :image_url)
  end

  def authorize_admin
    render json: { error: 'Unauthorized' }, status: :forbidden unless current_user&.admin?
  end
end
