class ReadingHistory < ApplicationRecord
  belongs_to :user
  belongs_to :comic
  belongs_to :last_chapter, class_name: 'Chapter', optional: true

  validates :user_id, uniqueness: { scope: :comic_id }
end
