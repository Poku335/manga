class CreateReadingHistories < ActiveRecord::Migration[8.1]
  def change
    create_table :reading_histories do |t|
      t.references :user, null: false, foreign_key: true
      t.references :comic, null: false, foreign_key: true
      t.references :last_chapter, foreign_key: { to_table: :chapters }

      t.timestamps
    end

    add_index :reading_histories, [:user_id, :comic_id], unique: true
  end
end
