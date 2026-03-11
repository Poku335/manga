class Api::V1::DashboardController < ApplicationController
  before_action :authorize_request
  before_action :authorize_admin

  def stats
    render json: {
      total_users: User.count,
      total_comics: Comic.count,
      total_chapters: Chapter.count,
      total_views: Comic.sum(:views_count),
      recent_users: User.order(created_at: :desc).limit(5).as_json(except: [:password_digest]),
      popular_comics: Comic.order(views_count: :desc).limit(10).as_json(methods: [:average_rating])
    }
  end

  private

  def authorize_admin
    render json: { error: 'Unauthorized' }, status: :forbidden unless current_user&.admin?
  end
end
