class Page < ApplicationRecord
  belongs_to :chapter

  validates :page_number, presence: true, uniqueness: { scope: :chapter_id }
  validates :image_url, presence: true

  scope :ordered, -> { order(page_number: :asc) }
end
