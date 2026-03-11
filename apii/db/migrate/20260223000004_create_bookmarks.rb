class CreateBookmarks < ActiveRecord::Migration[8.1]
  def change
    create_table :bookmarks do |t|
      t.references :user, null: false, foreign_key: true
      t.references :chapter, null: false, foreign_key: true
      t.integer :last_page, default: 1

      t.timestamps
    end

    add_index :bookmarks, [:user_id, :chapter_id], unique: true
  end
end
