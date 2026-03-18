
genres_data = [
  'แฟนตาซี', 'ระบบ', 'แอคชั่น', 'รักโรแมนติก', 'กำลังภายใน',
  'ผจญภัย', 'ไซไฟ,วิทยาศาสตร์', 'เกิดใหม่', 'ตลก,คอมเมดี้',
  'โบราณ,ย้อนยุค', 'เกมออนไลน์', 'ชีวิตในโรงเรียน', 'ต่างโลก',
  'ดราม่า', 'ฮาเร็ม', 'อดีต,อนาคต', 'สะท้อนชีวิต'
]

genres_data.each do |genre_name|
  Genre.find_or_create_by!(name: genre_name)
end


admin = User.find_or_create_by!(email: 'admin@comic.com') do |u|
  u.username = 'admin'
  u.password = '1234'
  u.password_confirmation = '1234'
  u.role = 'admin'
  u.status = 'active'
end


user = User.find_or_create_by!(email: 'user@comic.com') do |u|
  u.username = 'reader'
  u.password = 'password123'
  u.password_confirmation = 'password123'
  u.role = 'user'
  u.status = 'active'
end


poku = User.find_or_create_by!(email: 'poku@gmail.com') do |u|
  u.username = 'poku_reader'
  u.password = '1234'
  u.password_confirmation = '1234'
  u.role = 'user'
  u.status = 'active'
end

comic1 = Comic.find_or_create_by!(title: 'One Piece') do |c|
  c.description = 'A story about pirates searching for the ultimate treasure'
  c.author = 'Eiichiro Oda'
  c.status = 'published'
  c.cover_image = 'https://img2.pic.in.th/images-1611201b348bd7820.jpeg'
  c.user = admin
  c.views_count = 1000
  c.primary_genre = 'ผจญภัย'
  c.secondary_genre = 'แอคชั่น'
end


comic1.genres = Genre.where(name: ['ผจญภัย', 'แอคชั่น']) if comic1.genres.empty?

comic2 = Comic.find_or_create_by!(title: 'Naruto') do |c|
  c.description = 'A young ninja who seeks recognition and dreams of becoming the Hokage'
  c.author = 'Masashi Kishimoto'
  c.status = 'published'
  c.cover_image = 'https://img2.pic.in.th/images-1611201b348bd7820.jpeg'
  c.user = admin
  c.views_count = 850
  c.primary_genre = 'แอคชั่น'
  c.secondary_genre = 'ชีวิตในโรงเรียน'
end


comic2.genres = Genre.where(name: ['แอคชั่น', 'ชีวิตในโรงเรียน']) if comic2.genres.empty?


3.times do |i|
  chapter = Chapter.create!(
    comic: comic1,
    chapter_number: i + 1,
    title: "Chapter #{i + 1}",
    published_at: Time.now
  )


  5.times do |j|
    Page.create!(
      chapter: chapter,
      page_number: j + 1,
      image_url: "https://via.placeholder.com/800x1200/#{['FF6B6B', '4ECDC4', 'FFE66D'][i]}/FFFFFF?text=Page+#{j + 1}"
    )
  end
end


2.times do |i|
  chapter = Chapter.create!(
    comic: comic2,
    chapter_number: i + 1,
    title: "Chapter #{i + 1}",
    published_at: Time.now
  )

  5.times do |j|
    Page.create!(
      chapter: chapter,
      page_number: j + 1,
      image_url: "https://via.placeholder.com/800x1200/#{['95E1D3', 'F38181'][i]}/FFFFFF?text=Page+#{j + 1}"
    )
  end
end


Rating.create!(user: user, comic: comic1, score: 5)
Rating.create!(user: user, comic: comic2, score: 4)


Comment.create!(user: user, comic: comic1, content: 'Amazing story! Can\'t wait for the next chapter!')
Comment.create!(user: user, comic: comic2, content: 'Classic manga, love it!')

puts "Seed data created successfully!"
puts "Admin: admin@comic.com / password123"
puts "User: user@comic.com / password123"
