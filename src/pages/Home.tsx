import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, PenTool, Smartphone, Monitor, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const BlogPost = ({ title, excerpt, category, date, readTime, featured = false }: {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  featured?: boolean
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`group cursor-pointer ${featured ? 'md:col-span-2' : ''}`}
  >
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:shadow-xl">
      <div className={`bg-gradient-to-br from-violet-50 to-purple-50 ${featured ? 'h-48' : 'h-32'} rounded-t-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-purple-600/20 flex items-center justify-center">
          <div className="text-6xl opacity-20">
            {category === 'UI/UX' && <Smartphone />}
            {category === 'Typography' && <PenTool />}
            {category === 'Color Theory' && <Palette />}
            {category === 'Web Design' && <Monitor />}
            {category === 'Trends' && <Sparkles />}
          </div>
        </div>
        {featured && (
          <Badge className="absolute top-4 right-4 bg-violet-600 hover:bg-violet-700">
            Featured
          </Badge>
        )}
      </div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{readTime}</span>
        </div>
        <CardTitle className={`group-hover:text-violet-600 transition-colors duration-300 ${featured ? 'text-xl' : 'text-lg'}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">
          {excerpt}
        </CardDescription>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{date}</span>
          <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 p-0">
            Weiterlesen →
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: {
  categories: string[]
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
        } transition-all duration-300`}
      >
        {category}
      </Button>
    ))}
  </div>
)

const Hero = () => (
  <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
        >
          Design Inspiration & Trends
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 leading-relaxed"
        >
          Entdecke die neuesten Design-Trends, UI/UX-Insights und kreative Inspirationen für moderne digitale Erlebnisse.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-semibold">
            Neueste Artikel
          </Button>
          <Button variant="outline" size="lg" className="border-violet-200 text-violet-600 hover:bg-violet-50 px-8 py-3 rounded-lg font-semibold">
            Newsletter abonnieren
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
)

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('Alle')
  
  const categories = ['Alle', 'UI/UX', 'Typography', 'Color Theory', 'Web Design', 'Trends']
  
  const blogPosts = [
    {
      title: "Die Zukunft des UI/UX Designs in 2024",
      excerpt: "Entdecke die wichtigsten Trends und Entwicklungen, die das User Interface und User Experience Design in diesem Jahr prägen werden.",
      category: "UI/UX",
      date: "15. Januar 2024",
      readTime: "8 min",
      featured: true
    },
    {
      title: "Typografie-Trends: Mehr als nur Schrift",
      excerpt: "Wie moderne Typografie das digitale Erlebnis formt und welche Schriftarten 2024 dominieren werden.",
      category: "Typography",
      date: "12. Januar 2024",
      readTime: "6 min"
    },
    {
      title: "Farbpsychologie im modernen Design",
      excerpt: "Die Wissenschaft hinter Farben und wie sie Emotionen und Verhalten beeinflussen.",
      category: "Color Theory",
      date: "10. Januar 2024",
      readTime: "7 min"
    },
    {
      title: "Responsive Design: Mobile First Prinzipien",
      excerpt: "Warum Mobile First nicht nur ein Trend ist, sondern eine Notwendigkeit für moderne Websites.",
      category: "Web Design",
      date: "8. Januar 2024",
      readTime: "5 min"
    },
    {
      title: "Minimalismus vs. Maximalismus: Was funktioniert 2024?",
      excerpt: "Ein Vergleich der beiden Design-Philosophien und wann welcher Ansatz die bessere Wahl ist.",
      category: "Trends",
      date: "5. Januar 2024",
      readTime: "9 min"
    },
    {
      title: "Accessibility: Design für alle",
      excerpt: "Warum barrierefreies Design nicht nur eine rechtliche Anforderung ist, sondern bessere Produkte schafft.",
      category: "UI/UX",
      date: "3. Januar 2024",
      readTime: "10 min"
    }
  ]
  
  const filteredPosts = activeCategory === 'Alle' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <>
      <Hero />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Neueste Artikel</h2>
          <p className="text-gray-600">Bleib auf dem Laufenden mit den neuesten Design-Trends und Insights</p>
        </div>
        
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-300 px-8 py-3 rounded-lg font-semibold"
          >
            Mehr Artikel laden
          </Button>
        </div>
      </main>
    </>
  )
}

export default HomePage;
