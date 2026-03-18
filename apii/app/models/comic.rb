class Comic < ApplicationRecord
  belongs_to :user
  has_many :chapters, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :reading_histories, dependent: :destroy
  has_many :comic_genres, dependent: :destroy
  has_many :genres, through: :comic_genres

  validates :title, presence: true
  validates :status, inclusion: { in: %w[draft published] }

  scope :published, -> { where(status: 'published') }
  scope :popular, -> { order(views_count: :desc) }
  scope :trending, -> { order(average_rating: :desc, bookmarks_count: :desc) }
  scope :recent, -> { order(created_at: :desc) }
  scope :by_genre, ->(genre_name) { joins(:genres).where(genres: { name: genre_name }).distinct }
  scope :by_primary_genre, ->(genre_name) { where(primary_genre: genre_name) }

  def average_rating
    ratings.average(:score)&.round(1) || 0
  end

  def increment_views!
    increment!(:views_count)
  end

  def update_ratings_count
    update(
      ratings_count: ratings.count,
      average_rating: ratings.average(:score)&.round(2) || 0
    )
  end

  def update_bookmarks_count
    update(bookmarks_count: bookmarks.count)
  end
end
