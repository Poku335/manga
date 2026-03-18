class ComicGenre < ApplicationRecord
  belongs_to :comic
  belongs_to :genre
end
