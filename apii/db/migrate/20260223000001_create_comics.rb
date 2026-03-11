class CreateComics < ActiveRecord::Migration[8.1]
  def change
    create_table :comics do |t|
      t.string :title, null: false
      t.text :description
      t.string :author
      t.string :status, default: 'draft'
      t.string :cover_image
      t.integer :views_count, default: 0
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :comics, :status
    add_index :comics, :title
  end
end
