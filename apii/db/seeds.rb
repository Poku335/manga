# Create admin user
admin = User.create!(
  email: 'admin@comic.com',
  username: 'admin',
  password: '1234',
  password_confirmation: '1234',
  role: 'admin',
  status: 'active'
)

# Create regular user
user = User.create!(
  email: 'user@comic.com',
  username: 'reader',
  password: 'password123',
  password_confirmation: 'password123',
  role: 'user',
  status: 'active'
)

user = User.create!(
  email: 'poku@gmail.com.com',
  username: 'reader',
  password: '1234',
  password_confirmation: '1234',
  role: 'user',
  status: 'active'
)
comic1 = Comic.create!(
  title: 'One Piece',
  description: 'A story about pirates searching for the ultimate treasure',
  author: 'Eiichiro Oda',
  status: 'published',
  cover_image: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=One+Piece',
  user: admin,
  views_count: 1000
)

comic2 = Comic.create!(
  title: 'Naruto',
  description: 'A young ninja who seeks recognition and dreams of becoming the Hokage',
  author: 'Masashi Kishimoto',
  status: 'published',
  cover_image: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Naruto',
  user: admin,
  views_count: 850
)

# Create chapters for comic1
3.times do |i|
  chapter = Chapter.create!(
    comic: comic1,
    chapter_number: i + 1,
    title: "Chapter #{i + 1}",
    published_at: Time.now
  )

  # Create pages for each chapter
  5.times do |j|
    Page.create!(
      chapter: chapter,
      page_number: j + 1,
      image_url: "https://via.placeholder.com/800x1200/#{['FF6B6B', '4ECDC4', 'FFE66D'][i]}/FFFFFF?text=Page+#{j + 1}"
    )
  end
end

# Create chapters for comic2
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

# Create sample ratings
Rating.create!(user: user, comic: comic1, score: 5)
Rating.create!(user: user, comic: comic2, score: 4)

# Create sample comments
Comment.create!(user: user, comic: comic1, content: 'Amazing story! Can\'t wait for the next chapter!')
Comment.create!(user: user, comic: comic2, content: 'Classic manga, love it!')

puts "✅ Seed data created successfully!"
puts "Admin: admin@comic.com / password123"
puts "User: user@comic.com / password123"
