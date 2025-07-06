import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Palette, Search, Menu, X } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Separator } from './components/ui/separator'
import HomePage from './pages/Home'
import CommunityPage from './pages/Community';
import DiscussionTopicPage from './pages/DiscussionTopic';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-gray-700 hover:text-violet-600 transition-colors font-medium ${
      isActive ? 'text-violet-600' : ''
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              DesignBlog
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/community" className={navLinkClasses}>Community</NavLink>
            <a href="#" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Über uns</a>
            <a href="#" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Kontakt</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Suchen..."
                  className="pl-10 w-64 border-gray-200 focus:border-violet-300 focus:ring-violet-200"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t"
          >
            <div className="flex flex-col space-y-4">
              <NavLink to="/" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
              <NavLink to="/community" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>Community</NavLink>
              <a href="#" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Über uns</a>
              <a href="#" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Kontakt</a>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Suchen..."
                  className="pl-10 border-gray-200 focus:border-violet-300 focus:ring-violet-200"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DesignBlog</span>
          </div>
          <p className="text-gray-400 mb-4 max-w-md">
            Dein Destination für Design-Inspiration, Trends und praktische Tipps aus der Welt des modernen Designs.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Kategorien</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">UI/UX Design</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Typography</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Color Theory</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Web Design</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Über uns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
          </ul>
        </div>
      </div>

      <Separator className="my-8 bg-gray-800" />

      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          &copy; 2024 DesignBlog. Alle Rechte vorbehalten.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
        </div>
      </div>
    </div>
  </footer>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/:topicId" element={<DiscussionTopicPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App