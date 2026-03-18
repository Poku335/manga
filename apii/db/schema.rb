











ActiveRecord::Schema[8.1].define(version: 2026_03_12_000001) do

  enable_extension "pg_catalog.plpgsql"

  create_table "bookmarks", force: :cascade do |t|
    t.bigint "chapter_id", null: false
    t.datetime "created_at", null: false
    t.integer "last_page", default: 1
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["chapter_id"], name: "index_bookmarks_on_chapter_id"
    t.index ["user_id", "chapter_id"], name: "index_bookmarks_on_user_id_and_chapter_id", unique: true
    t.index ["user_id"], name: "index_bookmarks_on_user_id"
  end

  create_table "chapters", force: :cascade do |t|
    t.integer "chapter_number", null: false
    t.bigint "comic_id", null: false
    t.datetime "created_at", null: false
    t.datetime "published_at"
    t.string "title"
    t.datetime "updated_at", null: false
    t.index ["comic_id", "chapter_number"], name: "index_chapters_on_comic_id_and_chapter_number", unique: true
    t.index ["comic_id"], name: "index_chapters_on_comic_id"
  end

  create_table "comic_genres", force: :cascade do |t|
    t.bigint "comic_id", null: false
    t.datetime "created_at", null: false
    t.bigint "genre_id", null: false
    t.datetime "updated_at", null: false
    t.index ["comic_id", "genre_id"], name: "index_comic_genres_on_comic_id_and_genre_id", unique: true
    t.index ["comic_id"], name: "index_comic_genres_on_comic_id"
    t.index ["genre_id"], name: "index_comic_genres_on_genre_id"
  end

  create_table "comics", force: :cascade do |t|
    t.string "author"
    t.decimal "average_rating", precision: 3, scale: 2, default: "0.0"
    t.integer "bookmarks_count", default: 0
    t.string "cover_image"
    t.datetime "created_at", null: false
    t.text "description"
    t.string "primary_genre"
    t.integer "ratings_count", default: 0
    t.string "secondary_genre"
    t.string "status", default: "draft"
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.integer "views_count", default: 0
    t.index ["primary_genre"], name: "index_comics_on_primary_genre"
    t.index ["secondary_genre"], name: "index_comics_on_secondary_genre"
    t.index ["status"], name: "index_comics_on_status"
    t.index ["title"], name: "index_comics_on_title"
    t.index ["user_id"], name: "index_comics_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "comic_id", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["comic_id"], name: "index_comments_on_comic_id"
    t.index ["created_at"], name: "index_comments_on_created_at"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "genres", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_genres_on_name", unique: true
  end

  create_table "pages", force: :cascade do |t|
    t.bigint "chapter_id", null: false
    t.datetime "created_at", null: false
    t.string "image_url", null: false
    t.integer "page_number", null: false
    t.datetime "updated_at", null: false
    t.index ["chapter_id", "page_number"], name: "index_pages_on_chapter_id_and_page_number", unique: true
    t.index ["chapter_id"], name: "index_pages_on_chapter_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.bigint "comic_id", null: false
    t.datetime "created_at", null: false
    t.integer "score", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["comic_id"], name: "index_ratings_on_comic_id"
    t.index ["user_id", "comic_id"], name: "index_ratings_on_user_id_and_comic_id", unique: true
    t.index ["user_id"], name: "index_ratings_on_user_id"
    t.check_constraint "score >= 1 AND score <= 5", name: "score_range"
  end

  create_table "reading_histories", force: :cascade do |t|
    t.bigint "comic_id", null: false
    t.datetime "created_at", null: false
    t.bigint "last_chapter_id"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["comic_id"], name: "index_reading_histories_on_comic_id"
    t.index ["last_chapter_id"], name: "index_reading_histories_on_last_chapter_id"
    t.index ["user_id", "comic_id"], name: "index_reading_histories_on_user_id_and_comic_id", unique: true
    t.index ["user_id"], name: "index_reading_histories_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "password_digest"
    t.string "role", default: "user"
    t.integer "status", default: 0
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "bookmarks", "chapters"
  add_foreign_key "bookmarks", "users"
  add_foreign_key "chapters", "comics"
  add_foreign_key "comic_genres", "comics"
  add_foreign_key "comic_genres", "genres"
  add_foreign_key "comics", "users"
  add_foreign_key "comments", "comics"
  add_foreign_key "comments", "users"
  add_foreign_key "pages", "chapters"
  add_foreign_key "ratings", "comics"
  add_foreign_key "ratings", "users"
  add_foreign_key "reading_histories", "chapters", column: "last_chapter_id"
  add_foreign_key "reading_histories", "comics"
  add_foreign_key "reading_histories", "users"
end
