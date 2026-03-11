class Api::V1::AuthController < ApplicationController
  def register
    @user = User.new(user_params)
    @user.role ||= 'user'

    if @user.save
      token = JwtService.encode(user_id: @user.id)
      render json: {
        token: token,
        user: @user.as_json(except: [:password_digest])
      }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      token = JwtService.encode(user_id: @user.id)
      render json: {
        token: token,
        user: @user.as_json(except: [:password_digest])
      }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def me
    authorize_request
    render json: current_user.as_json(except: [:password_digest])
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end
end
