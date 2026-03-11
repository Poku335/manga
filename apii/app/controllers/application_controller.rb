class ApplicationController < ActionController::API
  def authorize_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    
    begin
      decoded = JwtService.decode(token)
      @current_user = User.find(decoded[:user_id]) if decoded
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user
  end

  def current_user
    @current_user
  end
end
