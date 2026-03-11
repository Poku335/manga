class Api::V1::CommentsController < ApplicationController
  before_action :authorize_request, except: [:index]
  before_action :set_comic

  def index
    @comments = @comic.comments.includes(:user).recent
    render json: @comments.as_json(include: { user: { only: [:id, :username] } })
  end

  def create
    @comment = @comic.comments.build(comment_params.merge(user: current_user))
    if @comment.save
      render json: @comment, status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = @comic.comments.find(params[:id])
    if @comment.user == current_user || current_user.admin?
      @comment.destroy
      head :no_content
    else
      render json: { error: 'Unauthorized' }, status: :forbidden
    end
  end

  private

  def set_comic
    @comic = Comic.find(params[:comic_id])
  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end
