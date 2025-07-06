import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

interface DesignItem {
  id: string
  title: string
  category: string
  date: string
  imageUrl: string
  photographer: string
  showTitle: boolean
}

const DesignGrid = ({ designs, onDesignClick }: {
  designs: DesignItem[]
  onDesignClick: (id: string) => void
}) => {
  const getGridClass = (index: number) => {
    // Create a varied grid pattern
    const patterns = [
      'md:row-span-2',
      'md:col-span-2',
      '',
      'md:row-span-2',
      '',
      'md:col-span-2',
      '',
      'md:row-span-2',
      '',
      '',
      'md:col-span-2',
      '',
    ]
    return patterns[index % patterns.length]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
      {designs.map((design, index) => (
        <motion.div
          key={design.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`group cursor-pointer relative overflow-hidden rounded-xl ${getGridClass(index)}`}
          onClick={() => onDesignClick(design.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={design.imageUrl}
              alt={design.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Title Overlay */}
          <AnimatePresence>
            {design.showTitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4"
              >
                <div className="text-white">
                  <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-white/30">
                    {design.category}
                  </Badge>
                  <h3 className="text-lg font-bold mb-1 leading-tight">
                    {design.title}
                  </h3>
                  <p className="text-sm text-white/80 mb-1">
                    {design.date}
                  </p>
                  <p className="text-xs text-white/60">
                    Foto: {design.photographer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover indicator */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

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
          Design Inspiration Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 leading-relaxed"
        >
          Entdecke visuell beeindruckende Designs. Klicke auf ein Bild, um Details zu sehen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-semibold">
            Designs entdecken
          </Button>
          <Button variant="outline" size="lg" className="border-violet-200 text-violet-600 hover:bg-violet-50 px-8 py-3 rounded-lg font-semibold">
            Inspiration teilen
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
)

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('Alle')
  const [designs, setDesigns] = useState<DesignItem[]>([
    {
      id: '1',
      title: 'Moderne UI/UX Dashboard Design',
      category: 'UI/UX',
      date: '15. Januar 2024',
      imageUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MHwwfHx8MTc1MTgyOTMyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Ferenc Almasi',
      showTitle: false
    },
    {
      id: '2',
      title: 'Minimalistisches Web Design',
      category: 'Web Design',
      date: '12. Januar 2024',
      imageUrl: 'https://images.unsplash.com/photo-1653548410459-5dffc2cef115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBVSSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwwfDB8fHwxNzUxODI5MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Tran Mau Tri Tam',
      showTitle: false
    },
    {
      id: '3',
      title: 'Abstrakte Farbkomposition',
      category: 'Color Theory',
      date: '10. Januar 2024',
      imageUrl: 'https://images.unsplash.com/photo-1645323927873-db707f7728a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBVSSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwwfDB8fHwxNzUxODI5MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Allison Saeng',
      showTitle: false
    },
    {
      id: '4',
      title: 'Responsive Design Mockup',
      category: 'Web Design',
      date: '8. Januar 2024',
      imageUrl: 'https://images.unsplash.com/photo-1730993872148-83acdfb597e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwyfHx3ZWIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MHwwfHx8MTc1MTgyOTMyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'János Venczák',
      showTitle: false
    },
    {
      id: '5',
      title: 'Geometrische Designelemente',
      category: 'Trends',
      date: '5. Januar 2024',
      imageUrl: 'https://images.unsplash.com/photo-1568581929936-045d47851491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjBVSSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwwfDB8fHwxNzUxODI5MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Martin Woortman',
      showTitle: false
    },
    {
      id: '6',
      title: 'Moderne Typografie Layout',
      category: 'Typography',
      date: '3. Januar 2024',
      imageUrl: 'https://images.unsplash.com/photo-1610989001873-03968eed0f08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHx3ZWIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MHwwfHx8MTc1MTgyOTMyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Ferenc Almasi',
      showTitle: false
    },
    {
      id: '7',
      title: 'Futuristische UI Elemente',
      category: 'UI/UX',
      date: '1. Januar 2024',
      imageUrl: 'https://images.unsplash.com/photo-1738028449238-fa5ae8c33bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw5fHxtb2Rlcm4lMjBVSSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwwfDB8fHwxNzUxODI5MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Hassaan Here',
      showTitle: false
    },
    {
      id: '8',
      title: 'Interaktive Designprototypen',
      category: 'UI/UX',
      date: '30. Dezember 2023',
      imageUrl: 'https://images.unsplash.com/photo-1591381287254-b3349c60bf9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxMHx8bW9kZXJuJTIwVUklMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MHwwfHx8MTc1MTgyOTMxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Sigmund',
      showTitle: false
    },
    {
      id: '9',
      title: 'Kreative Farbpaletten',
      category: 'Color Theory',
      date: '28. Dezember 2023',
      imageUrl: 'https://images.unsplash.com/photo-1750047158713-5a53fbed78a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw3fHxtb2Rlcm4lMjBVSSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwwfDB8fHwxNzUxODI5MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Hassaan Here',
      showTitle: false
    },
    {
      id: '10',
      title: 'Mobile-First Design Konzept',
      category: 'Web Design',
      date: '25. Dezember 2023',
      imageUrl: 'https://images.unsplash.com/photo-1630522790858-50b4ef44944b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw4fHx3ZWIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MHwwfHx8MTc1MTgyOTMyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Katie Polansky',
      showTitle: false
    },
    {
      id: '11',
      title: 'Innovative Designtrends 2024',
      category: 'Trends',
      date: '22. Dezember 2023',
      imageUrl: 'https://images.unsplash.com/photo-1653539778862-32eea45bb468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw2fHxtb2Rlcm4lMjBVSSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwwfDB8fHwxNzUxODI5MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Brecht Corbeel',
      showTitle: false
    },
    {
      id: '12',
      title: 'Experimentelle Typografie',
      category: 'Typography',
      date: '20. Dezember 2023',
      imageUrl: 'https://images.unsplash.com/photo-1585884570069-d9249f14d31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw4fHxtb2Rlcm4lMjBVSSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwwfDB8fHwxNzUxODI5MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      photographer: 'Lan Ruqing',
      showTitle: false
    }
  ])
  
  const categories = ['Alle', 'UI/UX', 'Web Design', 'Typography', 'Color Theory', 'Trends']
  
  const filteredDesigns = activeCategory === 'Alle' 
    ? designs 
    : designs.filter(design => design.category === activeCategory)

  const handleDesignClick = (id: string) => {
    setDesigns(prev => prev.map(design => 
      design.id === id 
        ? { ...design, showTitle: !design.showTitle }
        : { ...design, showTitle: false }
    ))
  }

  return (
    <>
      <Hero />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Design Gallery</h2>
          <p className="text-gray-600">Klicke auf ein Design, um mehr Details zu sehen</p>
        </div>
        
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <DesignGrid 
          designs={filteredDesigns}
          onDesignClick={handleDesignClick}
        />
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-300 px-8 py-3 rounded-lg font-semibold"
          >
            Mehr Designs laden
          </Button>
        </div>
      </main>
    </>
  )
}

export default HomePage