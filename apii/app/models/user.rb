class User < ApplicationRecord
  has_secure_password

  has_many :comics, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :reading_histories, dependent: :destroy

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :role, inclusion: { in: %w[user admin] }

  enum :status, { active: 0, banned: 1 }, default: :active

  def admin?
    role == 'admin'
  end
end
