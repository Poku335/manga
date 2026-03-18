class AddGenreSupport < ActiveRecord::Migration[8.1]
  def change

    add_column :comics, :primary_genre, :string
    add_column :comics, :secondary_genre, :string
    add_column :comics, :bookmarks_count, :integer, default: 0
    add_column :comics, :ratings_count, :integer, default: 0
    add_column :comics, :average_rating, :decimal, precision: 3, scale: 2, default: 0


    create_table :genres do |t|
      t.string :name, null: false
      t.text :description

      t.timestamps
    end

    add_index :genres, :name, unique: true


    create_table :comic_genres do |t|
      t.references :comic, null: false, foreign_key: true
      t.references :genre, null: false, foreign_key: true

      t.timestamps
    end

    add_index :comic_genres, [:comic_id, :genre_id], unique: true


    add_index :comics, :primary_genre
    add_index :comics, :secondary_genre
  end
end
