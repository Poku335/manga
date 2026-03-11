class Api::V1::SearchController < ApplicationController
  def index
    query = params[:q]
    
    if query.present?
      @comics = Comic.published
                     .where("title ILIKE ? OR author ILIKE ? OR description ILIKE ?", 
                            "%#{query}%", "%#{query}%", "%#{query}%")
                     .limit(20)
      
      render json: @comics.as_json(
        include: { chapters: { only: [:id, :chapter_number, :title] } },
        methods: [:average_rating]
      )
    else
      render json: []
    end
  end
end
