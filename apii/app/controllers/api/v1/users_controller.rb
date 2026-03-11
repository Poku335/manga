class Api::V1::UsersController < ApplicationController
  before_action :authorize_request
  before_action :authorize_admin, only: [:index, :update, :destroy, :ban, :unban]
  before_action :set_user, only: [:show, :update, :destroy, :ban, :unban]

  def index
    @users = User.all.order(created_at: :desc)
    render json: @users.as_json(except: [:password_digest])
  end

  def show
    render json: @user.as_json(except: [:password_digest])
  end

  def update
    if @user.update(user_params)
      render json: @user.as_json(except: [:password_digest])
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    head :no_content
  end

  def ban
    @user.update(status: 'banned')
    render json: { message: 'User banned successfully' }
  end

  def unban
    @user.update(status: 'active')
    render json: { message: 'User unbanned successfully' }
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :role, :status)
  end

  def authorize_admin
    render json: { error: 'Unauthorized' }, status: :forbidden unless current_user&.admin?
  end
end
