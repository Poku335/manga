class Chapter < ApplicationRecord
  belongs_to :comic
  has_many :pages, dependent: :destroy
  has_many :bookmarks, dependent: :destroy

  validates :chapter_number, presence: true, uniqueness: { scope: :comic_id }

  scope :published, -> { where.not(published_at: nil) }
  scope :ordered, -> { order(chapter_number: :asc) }

  def published?
    published_at.present?
  end
end
