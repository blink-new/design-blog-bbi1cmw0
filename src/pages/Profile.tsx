import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Trophy, 
  Star, 
  Eye, 
  Heart, 
  Share2,
  Grid,
  Filter,
  Download,
  ExternalLink
} from 'lucide-react';

// Mock data for the profile
const userData = {
  id: 'user123',
  name: 'Emma Schneider',
  username: '@emmadesigns',
  bio: 'Passionate UI/UX Designer mit 5+ Jahren Erfahrung. Spezialisiert auf minimalistische Designs und intuitive User Experiences. Liebhaberin von Typografie und Farbpsychologie.',
  location: 'Berlin, Deutschland',
  joinDate: '2022-03-15',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=400&h=400&fit=crop&crop=face',
  level: 42,
  stats: {
    commentsGiven: 287,
    challengesParticipated: 34,
    totalDesigns: 89,
    totalViews: 15420,
    totalLikes: 2341
  }
};

const challengeDesigns = [
  {
    id: 1,
    title: 'Minimalist E-commerce App',
    challenge: 'Daily UI Challenge #001',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    likes: 145,
    views: 892,
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Banking Dashboard',
    challenge: 'UX Challenge 2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    likes: 203,
    views: 1247,
    date: '2024-01-08'
  },
  {
    id: 3,
    title: 'Music Player Interface',
    challenge: 'Weekly Design Challenge',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    likes: 98,
    views: 654,
    date: '2023-12-20'
  },
  {
    id: 4,
    title: 'Travel Booking App',
    challenge: 'Monthly UI Challenge',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
    likes: 176,
    views: 1083,
    date: '2023-12-10'
  }
];

const personalDesigns = [
  {
    id: 1,
    title: 'Brand Identity für Kaffeerösterei',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    likes: 234,
    views: 1456,
    date: '2024-01-20'
  },
  {
    id: 2,
    title: 'Responsive Website Design',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
    likes: 189,
    views: 1124,
    date: '2024-01-12'
  },
  {
    id: 3,
    title: 'Mobile App Wireframes',
    category: 'UX Design',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=300&fit=crop',
    likes: 156,
    views: 987,
    date: '2024-01-05'
  },
  {
    id: 4,
    title: 'Typografie Poster Series',
    category: 'Typography',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56cd601?w=400&h=300&fit=crop',
    likes: 278,
    views: 1789,
    date: '2023-12-28'
  },
  {
    id: 5,
    title: 'Logo Design Collection',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
    likes: 195,
    views: 1234,
    date: '2023-12-15'
  },
  {
    id: 6,
    title: 'UI Kit für Fintech App',
    category: 'UI Design',
    image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop',
    likes: 321,
    views: 2156,
    date: '2023-12-01'
  }
];

const categories = ['Alle', 'Branding', 'Web Design', 'UX Design', 'Typography', 'UI Design'];

const ProfilePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  
  const filteredPersonalDesigns = selectedCategory === 'Alle' 
    ? personalDesigns 
    : personalDesigns.filter(design => design.category === selectedCategory);

  const levelProgress = (userData.level % 10) * 10;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"></div>
            <CardContent className="relative pt-0">
              <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 -mt-16">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="text-3xl">{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 pt-16 lg:pt-0">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                      <p className="text-lg text-violet-600 font-medium">{userData.username}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {userData.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Dabei seit {new Date(userData.joinDate).toLocaleDateString('de-DE', { 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-4 lg:mt-0">
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Teilen
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Nachricht
                      </Button>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-gray-700 leading-relaxed">{userData.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats and Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-2xl font-bold">{userData.stats.commentsGiven}</span>
              </div>
              <p className="text-sm text-gray-600">Kommentare gegeben</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
                <span className="text-2xl font-bold">{userData.stats.challengesParticipated}</span>
              </div>
              <p className="text-sm text-gray-600">Challenges</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Eye className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-2xl font-bold">{userData.stats.totalViews.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600">Gesamtaufrufe</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-violet-600 mr-2" />
                <span className="text-2xl font-bold">Level {userData.level}</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
              <p className="text-xs text-gray-600 mt-2">{levelProgress}% bis Level {userData.level + 1}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Portfolio Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="challenges" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="challenges" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Challenge Designs
              </TabsTrigger>
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <Grid className="w-4 h-4" />
                Persönliche Designs
              </TabsTrigger>
            </TabsList>
            
            {/* Challenge Designs Tab */}
            <TabsContent value="challenges">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Challenge Designs</h2>
                <p className="text-gray-600">Designs erstellt für Wettbewerbe und Challenges</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challengeDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={design.image} 
                          alt={design.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                            <Button size="sm" variant="secondary">
                              <Eye className="w-4 h-4 mr-1" />
                              Ansehen
                            </Button>
                            <Button size="sm" variant="secondary">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {design.challenge}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2">{design.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {design.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {design.views}
                            </div>
                          </div>
                          <span>{new Date(design.date).toLocaleDateString('de-DE')}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            {/* Personal Designs Tab */}
            <TabsContent value="personal">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Persönliche Designs</h2>
                    <p className="text-gray-600">Eigene Projekte und Arbeiten</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-600" />
                    <div className="flex gap-2 flex-wrap">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="text-xs"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPersonalDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={design.image} 
                          alt={design.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                            <Button size="sm" variant="secondary">
                              <Eye className="w-4 h-4 mr-1" />
                              Ansehen
                            </Button>
                            <Button size="sm" variant="secondary">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {design.category}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2">{design.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {design.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {design.views}
                            </div>
                          </div>
                          <span>{new Date(design.date).toLocaleDateString('de-DE')}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;