class CreateChapters < ActiveRecord::Migration[8.1]
  def change
    create_table :chapters do |t|
      t.references :comic, null: false, foreign_key: true
      t.integer :chapter_number, null: false
      t.string :title
      t.datetime :published_at

      t.timestamps
    end

    add_index :chapters, [:comic_id, :chapter_number], unique: true
  end
end
