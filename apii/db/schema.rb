# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_02_23_000007) do
  # These are extensions that must be enabled in order to support this database
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

  create_table "comics", force: :cascade do |t|
    t.string "author"
    t.string "cover_image"
    t.datetime "created_at", null: false
    t.text "description"
    t.string "status", default: "draft"
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.integer "views_count", default: 0
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
