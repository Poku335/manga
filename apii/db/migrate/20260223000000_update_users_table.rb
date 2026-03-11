class UpdateUsersTable < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :email, :string unless column_exists?(:users, :email)
    add_column :users, :password_digest, :string unless column_exists?(:users, :password_digest)
    add_column :users, :role, :string, default: 'user' unless column_exists?(:users, :role)
    add_column :users, :status, :integer, default: 0 unless column_exists?(:users, :status)

    add_index :users, :email, unique: true unless index_exists?(:users, :email)
  end
end
