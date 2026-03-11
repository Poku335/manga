class Api::V1::RatingsController < ApplicationController
  before_action :authorize_request

  def create
    @rating = current_user.ratings.find_or_initialize_by(comic_id: params[:comic_id])
    @rating.score = params[:score]

    if @rating.save
      render json: @rating, status: :created
    else
      render json: { errors: @rating.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
