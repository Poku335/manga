class Comic < ApplicationRecord
  belongs_to :user
  has_many :chapters, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :reading_histories, dependent: :destroy

  validates :title, presence: true
  validates :status, inclusion: { in: %w[draft published] }

  scope :published, -> { where(status: 'published') }
  scope :popular, -> { order(views_count: :desc) }

  def average_rating
    ratings.average(:score)&.round(1) || 0
  end

  def increment_views!
    increment!(:views_count)
  end
end
