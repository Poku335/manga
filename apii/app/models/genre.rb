class Genre < ApplicationRecord
  has_many :comic_genres, dependent: :destroy
  has_many :comics, through: :comic_genres

  validates :name, presence: true, uniqueness: true
end
