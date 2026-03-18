class Api::V1::GenresController < ApplicationController
  def index
    @genres = Genre.all
    render json: @genres
  end

  def show
    @genre = Genre.find(params[:id])
    @comics = @genre.comics.published.page(params[:page]).per(20)
    render json: {
      genre: @genre,
      comics: @comics.as_json(
        include: { genres: { only: [:id, :name] } },
        methods: [:average_rating]
      )
    }
  end
end
