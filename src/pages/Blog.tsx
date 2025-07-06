import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card'
import { BookmarkIcon, Calendar, Clock, Eye, Star, TrendingUp } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  imageUrl: string
  author: string
  tags: string[]
  isFeatured: boolean
  views: number
  isBookmarked: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Die Zukunft des Minimalistischen Designs',
    excerpt: 'Entdecke, wie minimalistisches Design die digitale Welt prägt und welche Trends uns in 2024 erwarten.',
    category: 'Trends',
    date: '15. Januar 2024',
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0aWMlMjBkZXNpZ258ZW58MHwwfHx8MTc1MTgzMDA4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Anna Weber',
    tags: ['Minimalism', 'Trends', 'UI/UX'],
    isFeatured: true,
    views: 2453,
    isBookmarked: false
  },
  {
    id: '2',
    title: 'Farbpsychologie im digitalen Design',
    excerpt: 'Wie Farben Emotionen auslösen und das Nutzerverhalten beeinflussen - ein umfassender Guide.',
    category: 'Color Theory',
    date: '12. Januar 2024',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxjb2xvciUyMHBhbGV0dGUlMjBkZXNpZ258ZW58MHwwfHx8MTc1MTgzMDA4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Max Richter',
    tags: ['Color Theory', 'Psychology', 'UX'],
    isFeatured: true,
    views: 1876,
    isBookmarked: true
  },
  {
    id: '3',
    title: 'Typography Trends 2024',
    excerpt: 'Die neuesten Typografie-Trends und wie sie deine Designs revolutionieren können.',
    category: 'Typography',
    date: '10. Januar 2024',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHx0eXBvZ3JhcGh5JTIwZGVzaWdufGVufDB8MHx8fDE3NTE4MzAwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Sarah Klein',
    tags: ['Typography', 'Trends', 'Branding'],
    isFeatured: false,
    views: 934,
    isBookmarked: false
  },
  {
    id: '4',
    title: 'Creator Tools: Design-Software im Vergleich',
    excerpt: 'Figma, Adobe XD, Sketch - welches Tool ist das richtige für dein nächstes Projekt?',
    category: 'Creator Tools',
    date: '8. Januar 2024',
    readTime: '10 min',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB0b29sc3xlbnwwfDB8fHwxNzUxODMwMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Tom Schneider',
    tags: ['Tools', 'Software', 'Workflow'],
    isFeatured: true,
    views: 3421,
    isBookmarked: false
  },
  {
    id: '5',
    title: 'Fashion Meets Digital: Neue Kollaborationen',
    excerpt: 'Spannende Kooperationen zwischen Mode-Brands und digitalen Designern.',
    category: 'Fashion',
    date: '5. Januar 2024',
    readTime: '4 min',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWdufGVufDB8MHx8fDE3NTE4MzAwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Lisa Müller',
    tags: ['Fashion', 'Collaboration', 'Digital'],
    isFeatured: false,
    views: 1256,
    isBookmarked: true
  },
  {
    id: '6',
    title: 'Design Weekly: Top 10 Inspirationen',
    excerpt: 'Unsere wöchentliche Sammlung der besten Design-Inspirationen aus der Community.',
    category: 'Design Weekly',
    date: '3. Januar 2024',
    readTime: '3 min',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbnxlbnwwfDB8fHwxNzUxODMwMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Team DesignBlog',
    tags: ['Weekly', 'Inspiration', 'Community'],
    isFeatured: false,
    views: 2147,
    isBookmarked: false
  },
  {
    id: '7',
    title: 'Responsive Design: Mobile First Strategy',
    excerpt: 'Warum Mobile First die Zukunft des Webdesigns ist und wie du es richtig umsetzt.',
    category: 'Web Design',
    date: '1. Januar 2024',
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBkZXNpZ258ZW58MHwwfHx8MTc1MTgzMDA4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Marcus Lang',
    tags: ['Mobile', 'Responsive', 'Strategy'],
    isFeatured: false,
    views: 1789,
    isBookmarked: false
  },
  {
    id: '8',
    title: 'AI im Design: Fluch oder Segen?',
    excerpt: 'Wie Künstliche Intelligenz die Design-Branche verändert und was das für uns bedeutet.',
    category: 'Trends',
    date: '30. Dezember 2023',
    readTime: '9 min',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxBSSUyMGRlc2lnbnxlbnwwfDB8fHwxNzUxODMwMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Eva Becker',
    tags: ['AI', 'Future', 'Technology'],
    isFeatured: true,
    views: 4567,
    isBookmarked: true
  }
]

const categories = ['Alle', 'Trends', 'Fashion', 'Creator Tools', 'Design Weekly', 'Typography', 'Color Theory', 'Web Design']

const HeroGrid = () => {
  const featuredPosts = blogPosts.filter(post => post.isFeatured).slice(0, 4)
  
  return (
    <section className="py-16 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Design Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Entdecke die neuesten Trends, Tipps und Inspirationen aus der Welt des Designs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Best of the Week - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <Card className="group relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="absolute inset-0">
                <img
                  src={featuredPosts[0]?.imageUrl}
                  alt={featuredPosts[0]?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <Badge className="mb-4 bg-violet-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Best of the Week
                  </Badge>
                </div>
                <div className="text-white">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                    {featuredPosts[0]?.title}
                  </h2>
                  <p className="text-white/90 mb-4 text-lg">
                    {featuredPosts[0]?.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPosts[0]?.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPosts[0]?.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Spotlight Topic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="group relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="absolute inset-0">
                <img
                  src={featuredPosts[1]?.imageUrl}
                  alt={featuredPosts[1]?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <Badge className="mb-4 bg-purple-500 text-white w-fit">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Spotlight Topic
                </Badge>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {featuredPosts[1]?.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Clock className="w-4 h-4" />
                    {featuredPosts[1]?.readTime}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Featured Collab */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="group relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="absolute inset-0">
                <img
                  src={featuredPosts[2]?.imageUrl}
                  alt={featuredPosts[2]?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <Badge className="mb-4 bg-pink-500 text-white w-fit">
                  <Eye className="w-3 h-3 mr-1" />
                  Featured Collab
                </Badge>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {featuredPosts[2]?.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Clock className="w-4 h-4" />
                    {featuredPosts[2]?.readTime}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: {
  activeCategory: string
  onCategoryChange: (category: string) => void
}) => (
  <div className="flex flex-wrap gap-2 mb-8">
    {categories.map((category) => (
      <Button
        key={category}
        variant={activeCategory === category ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(category)}
        className={`${
          activeCategory === category
            ? 'bg-violet-600 hover:bg-violet-700 text-white'
            : 'hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200'
        } transition-all duration-300 rounded-full px-4 py-2`}
      >
        {category}
      </Button>
    ))}
  </div>
)

const BlogCard = ({ post }: { post: BlogPost }) => {
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked)

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white">
        <div className="relative overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white backdrop-blur-sm"
              onClick={handleBookmark}
            >
              <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-violet-600 text-violet-600' : 'text-gray-600'}`} />
            </Button>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-white/90 text-gray-700 border-none">
              {post.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
            <span>•</span>
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          <CardTitle className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-violet-600 transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </CardDescription>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('Alle')

  const filteredPosts = activeCategory === 'Alle' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  const getCategoryTitle = (category: string) => {
    if (category === 'Alle') return 'Alle Artikel'
    return category
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroGrid />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-black mb-4 text-center">
            {getCategoryTitle(activeCategory)}
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Entdecke unsere neuesten Artikel zu Design, Trends und Kreativität
          </p>
        </div>

        <CategoryFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold sticky bottom-8"
          >
            See all posts →
          </Button>
        </div>
      </main>
    </div>
  )
}

export default BlogPage