import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  Eye, 
  Star, 
  Heart,
  Share2,
  ThumbsUp,
  BookmarkIcon,
  ArrowLeft,
  MoreHorizontal,
  Flag,
  Reply
} from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Separator } from '../components/ui/separator'
import { Textarea } from '../components/ui/textarea'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  imageUrl: string
  author: string
  authorAvatar: string
  authorBio: string
  tags: string[]
  views: number
  likes: number
  isBookmarked: boolean
  rating: number
  totalRatings: number
}

interface Comment {
  id: string
  author: string
  authorAvatar: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies: Comment[]
}

interface RelatedPost {
  id: string
  title: string
  imageUrl: string
  category: string
  readTime: string
  views: number
}

// Sample blog post data
const blogPost: BlogPost = {
  id: '1',
  title: 'Die Zukunft des Minimalistischen Designs',
  excerpt: 'Entdecke, wie minimalistisches Design die digitale Welt prägt und welche Trends uns in 2024 erwarten.',
  content: `
    <p class="text-lg leading-relaxed mb-6">Minimalistisches Design ist mehr als nur ein Trend – es ist eine Philosophie, die die Art und Weise, wie wir digitale Erfahrungen gestalten, grundlegend verändert hat. In einer Welt, die von Informationsüberflutung geprägt ist, bietet minimalistisches Design eine willkommene Atempause.</p>

    <h2 class="text-2xl font-bold mb-4 text-gray-900">Die Grundprinzipien des Minimalismus</h2>
    <p class="mb-6">Das Herzstück des minimalistischen Designs liegt in der berühmten Maxime "Less is more". Diese Philosophie umfasst mehrere Kernprinzipien:</p>
    
    <ul class="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Klarheit und Einfachheit:</strong> Jedes Element muss einen klaren Zweck haben</li>
      <li><strong>Weißräume nutzen:</strong> Negative Spaces schaffen Ruhe und Fokus</li>
      <li><strong>Typografie im Mittelpunkt:</strong> Schrift wird zum gestalterischen Element</li>
      <li><strong>Reduzierte Farbpalette:</strong> Weniger Farben, mehr Wirkung</li>
    </ul>

    <h2 class="text-2xl font-bold mb-4 text-gray-900">Warum Minimalismus funktioniert</h2>
    <p class="mb-6">Die Psychologie hinter minimalistischem Design ist faszinierend. Studien zeigen, dass Menschen in sauberen, reduzierten Umgebungen besser fokussiert sind und Entscheidungen leichter treffen können. In der digitalen Welt übersetzt sich das in:</p>
    
    <blockquote class="border-l-4 border-violet-500 pl-6 italic text-lg text-gray-700 mb-6">
      "Minimalistisches Design ist nicht nur ästhetisch ansprechend, sondern auch funktional überlegen. Es reduziert kognitive Belastung und verbessert die Benutzererfahrung erheblich."
    </blockquote>

    <h2 class="text-2xl font-bold mb-4 text-gray-900">Trends für 2024</h2>
    <p class="mb-4">Das Jahr 2024 bringt spannende Entwicklungen im minimalistischen Design:</p>
    
    <h3 class="text-xl font-semibold mb-3 text-gray-800">1. Micro-Interaktionen</h3>
    <p class="mb-4">Subtile Animationen und Hover-Effekte beleben minimalistische Interfaces, ohne sie zu überladen.</p>
    
    <h3 class="text-xl font-semibold mb-3 text-gray-800">2. Glassmorphismus</h3>
    <p class="mb-4">Transparente Elemente mit Blur-Effekten schaffen Tiefe bei gleichzeitiger Einfachheit.</p>
    
    <h3 class="text-xl font-semibold mb-3 text-gray-800">3. Adaptive Minimalismus</h3>
    <p class="mb-6">Interfaces, die sich intelligent an den Nutzungskontext anpassen und nur relevante Elemente zeigen.</p>

    <h2 class="text-2xl font-bold mb-4 text-gray-900">Praktische Umsetzung</h2>
    <p class="mb-4">Für Designer bedeutet das:</p>
    
    <div class="bg-gray-50 p-6 rounded-lg mb-6">
      <h4 class="font-semibold mb-3">Checkliste für minimalistisches Design:</h4>
      <ul class="space-y-2">
        <li>✓ Entfernen Sie alle unnötigen Elemente</li>
        <li>✓ Verwenden Sie maximale 3 Farben</li>
        <li>✓ Schaffen Sie großzügige Weißräume</li>
        <li>✓ Fokussieren Sie auf eine klare Typografie</li>
        <li>✓ Testen Sie mit echten Nutzern</li>
      </ul>
    </div>

    <h2 class="text-2xl font-bold mb-4 text-gray-900">Fazit</h2>
    <p class="mb-6">Minimalistisches Design ist keine Modeerscheinung, sondern eine dauerhafte Antwort auf die Komplexität unserer digitalen Welt. Es hilft uns, das Wesentliche zu fokussieren und bessere Nutzererfahrungen zu schaffen.</p>
    
    <p class="text-gray-600 italic">Die Zukunft gehört denen, die verstehen, dass wahre Eleganz in der Einfachheit liegt.</p>
  `,
  category: 'Trends',
  date: '15. Januar 2024',
  readTime: '5 min',
  imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0aWMlMjBkZXNpZ258ZW58MHwwfHx8MTc1MTgzMDA4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  author: 'Anna Weber',
  authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdHxlbnwwfDB8fHwxNzUxODMwMDg3fDA&ixlib=rb-4.1.0&q=80&w=150',
  authorBio: 'Senior UX Designer bei Google mit 8 Jahren Erfahrung in minimalistischem Design',
  tags: ['Minimalism', 'Trends', 'UI/UX', 'Design Philosophy'],
  views: 2453,
  likes: 89,
  isBookmarked: false,
  rating: 4.8,
  totalRatings: 156
}

const comments: Comment[] = [
  {
    id: '1',
    author: 'Max Mustermann',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdHxlbnwwfDB8fHwxNzUxODMwMDg3fDA&ixlib=rb-4.1.0&q=80&w=150',
    content: 'Fantastischer Artikel! Die Punkte zum Glassmorphismus sind besonders interessant. Ich arbeite gerade an einem Projekt, wo wir genau diese Techniken einsetzen.',
    timestamp: '2 Stunden',
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: '1-1',
        author: 'Anna Weber',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdHxlbnwwfDB8fHwxNzUxODMwMDg3fDA&ixlib=rb-4.1.0&q=80&w=150',
        content: 'Danke Max! Würde mich freuen, wenn du deine Erfahrungen mit Glassmorphismus in zukünftigen Projekten teilst.',
        timestamp: '1 Stunde',
        likes: 5,
        isLiked: true,
        replies: []
      }
    ]
  },
  {
    id: '2',
    author: 'Lisa Schmidt',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdHxlbnwwfDB8fHwxNzUxODMwMDg3fDA&ixlib=rb-4.1.0&q=80&w=150',
    content: 'Als Anfängerin im UX Design finde ich deine Checkliste super hilfreich. Besonders der Punkt mit den maximal 3 Farben - das werde ich direkt umsetzen!',
    timestamp: '4 Stunden',
    likes: 8,
    isLiked: true,
    replies: []
  },
  {
    id: '3',
    author: 'Tom Bradley',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdHxlbnwwfDB8fHwxNzUxODMwMDg3fDA&ixlib=rb-4.1.0&q=80&w=150',
    content: 'Interessante Perspektive! Ich bin allerdings der Meinung, dass Minimalismus manchmal zu steril wirken kann. Wie balanciert ihr das aus?',
    timestamp: '6 Stunden',
    likes: 15,
    isLiked: false,
    replies: []
  }
]

const relatedPosts: RelatedPost[] = [
  {
    id: '2',
    title: 'Farbpsychologie im digitalen Design',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxjb2xvciUyMHBhbGV0dGUlMjBkZXNpZ258ZW58MHwwfHx8MTc1MTgzMDA4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Color Theory',
    readTime: '8 min',
    views: 1876
  },
  {
    id: '3',
    title: 'Typography Trends 2024',
    imageUrl: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHx0eXBvZ3JhcGh5JTIwZGVzaWdufGVufDB8MHx8fDE3NTE4MzAwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Typography',
    readTime: '6 min',
    views: 934
  },
  {
    id: '4',
    title: 'Creator Tools: Design-Software im Vergleich',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB0b29sc3xlbnwwfDB8fHwxNzUxODMwMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Creator Tools',
    readTime: '10 min',
    views: 3421
  }
]

const RatingWidget = () => {
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleRatingClick = (rating: number) => {
    setUserRating(rating)
  }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || userRating)
      stars.push(
        <button
          key={i}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          className="transition-colors duration-200 hover:scale-110"
        >
          <Star 
            className={`w-6 h-6 ${isFilled ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
          />
        </button>
      )
    }
    return stars
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Bewerte diesen Artikel</h3>
      <div className="flex items-center gap-2 mb-4">
        {renderStars()}
        <span className="text-sm text-gray-500 ml-2">
          {userRating > 0 ? `${userRating}/5` : 'Klicke auf einen Stern'}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-medium">{blogPost.rating}</span>
        </div>
        <span>•</span>
        <span>{blogPost.totalRatings} Bewertungen</span>
      </div>
      {userRating > 0 && (
        <div className="mt-4 p-3 bg-violet-50 rounded-lg">
          <p className="text-sm text-violet-700">
            Vielen Dank für deine Bewertung! 
          </p>
        </div>
      )}
    </div>
  )
}

const CommentSection = () => {
  const [newComment, setNewComment] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('')
    }
  }

  const Comment = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => {
    const [isLiked, setIsLiked] = useState(comment.isLiked)
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [replyText, setReplyText] = useState('')

    return (
      <div className={`${isReply ? 'ml-12' : ''}`}>
        <div className="flex gap-3 mb-4">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={comment.authorAvatar} alt={comment.author} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-4 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-sm">{comment.author}</span>
                <span className="text-xs text-gray-500">vor {comment.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-1 hover:text-violet-600 ${isLiked ? 'text-violet-600' : ''}`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{comment.likes + (isLiked ? 1 : 0)}</span>
              </button>
              {!isReply && (
                <button 
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="flex items-center gap-1 hover:text-violet-600"
                >
                  <Reply className="w-3 h-3" />
                  <span>Antworten</span>
                </button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hover:text-violet-600">
                    <MoreHorizontal className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Flag className="w-4 h-4 mr-2" />
                    Melden
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {showReplyForm && (
              <div className="mt-3 flex gap-2">
                <Input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Antworten..."
                  className="flex-1"
                />
                <Button size="sm" onClick={() => setShowReplyForm(false)}>
                  Antworten
                </Button>
              </div>
            )}
          </div>
        </div>
        {comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} isReply={true} />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Kommentare ({comments.length})</h3>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Neueste</SelectItem>
            <SelectItem value="oldest">Älteste</SelectItem>
            <SelectItem value="popular">Beliebteste</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Add Comment Form */}
      <div className="mb-6">
        <Label htmlFor="comment" className="text-sm font-medium mb-2 block">
          Kommentar hinzufügen
        </Label>
        <Textarea
          id="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Teile deine Gedanken zu diesem Artikel..."
          className="mb-3 resize-none"
          rows={3}
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Sei respektvoll und konstruktiv in deinen Kommentaren
          </span>
          <Button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className="bg-violet-600 hover:bg-violet-700"
          >
            Kommentar posten
          </Button>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

const RelatedArticles = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Weitere Artikel</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="group">
            <div className="relative overflow-hidden rounded-lg mb-3">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-white/90 text-gray-700 text-xs">
                  {post.category}
                </Badge>
              </div>
            </div>
            <h4 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors">
              {post.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
              <span>•</span>
              <Eye className="w-3 h-3" />
              <span>{post.views}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const BlogArticle = () => {
  const [isBookmarked, setIsBookmarked] = useState(blogPost.isBookmarked)
  const [isLiked, setIsLiked] = useState(false)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (!blogPost) {
    return <div>Artikel nicht gefunden</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={blogPost.imageUrl} 
          alt={blogPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-6 left-6">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zum Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-8 -mt-24 relative z-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-violet-100 text-violet-700">
                {blogPost.category}
              </Badge>
              <span className="text-sm text-gray-500">•</span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{blogPost.date}</span>
              </div>
              <span className="text-sm text-gray-500">•</span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime}</span>
              </div>
              <span className="text-sm text-gray-500">•</span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>{blogPost.views.toLocaleString()} Aufrufe</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {blogPost.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={blogPost.authorAvatar} alt={blogPost.author} />
                  <AvatarFallback>{blogPost.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{blogPost.author}</p>
                  <p className="text-sm text-gray-500">{blogPost.authorBio}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLike}
                  className={isLiked ? 'text-red-600 border-red-200' : ''}
                >
                  <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-red-600' : ''}`} />
                  {blogPost.likes + (isLiked ? 1 : 0)}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleBookmark}
                  className={isBookmarked ? 'text-violet-600 border-violet-200' : ''}
                >
                  <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-violet-600' : ''}`} />
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-8"
          >
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
            
            <Separator className="my-8" />
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Rating Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <RatingWidget />
          </motion.div>

          {/* Related Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <RelatedArticles />
          </motion.div>

          {/* Comments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <CommentSection />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BlogArticle