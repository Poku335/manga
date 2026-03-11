class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :comic

  validates :score, presence: true, inclusion: { in: 1..5 }
  validates :user_id, uniqueness: { scope: :comic_id }
end
