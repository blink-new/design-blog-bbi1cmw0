import React from 'react';
import { Link, useNavigate, useState } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { PlusCircle, MessageSquare, ArrowUp, Filter } from 'lucide-react';

const discussionTopics = [
  {
    id: 'glassmorphism-trend',
    title: 'Ist "Glassmorphism" noch ein relevanter Designtrend in 2024?',
    author: 'Alex Müller',
    avatar: 'https://github.com/shadcn.png',
    comments: 42,
    upvotes: 127,
    excerpt: 'Einige sagen, er ist überstrapaziert, andere halten ihn für modern. Was ist eure Meinung?',
    category: 'Design Trends'
  },
  {
    id: 'brutalism-revival',
    title: 'Das Comeback des Brutalismus im Webdesign',
    author: 'Maria Schmidt',
    avatar: 'https://github.com/maria.png',
    comments: 18,
    upvotes: 89,
    excerpt: 'Brutalismus ist wieder da, aber anders. Lasst uns die neuen Formen und Ausprägungen diskutieren.',
    category: 'Web Design'
  },
  {
    id: 'ai-in-design-tools',
    title: 'Wie KI-Tools unseren Design-Workflow verändern',
    author: 'Jonas Weber',
    avatar: 'https://github.com/jonas.png',
    comments: 76,
    upvotes: 256,
    excerpt: 'Von Figma-Plugins bis zu Midjourney: Welche KI-Tools nutzt ihr und wie beeinflussen sie eure Arbeit?',
    category: 'Creator Tools'
  },
  {
    id: 'responsive-design-challenges',
    title: 'Herausforderungen im Responsive Design',
    author: 'Tim Bergmann',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdHxlbnwwfDB8fHwxNzUxODMwMDg3fDA&ixlib=rb-4.1.0&q=80&w=150',
    comments: 55,
    upvotes: 180,
    excerpt: 'Diskussion über gängige Probleme und Lösungen bei der Umsetzung von Responsive Designs.',
    category: 'Web Design'
  },
  {
    id: 'design-systems-future',
    title: 'Die Zukunft von Design Systemen: Flexibilität vs. Konsistenz',
    author: 'Max Mustermann',
    avatar: 'https://github.com/max.png',
    comments: 60,
    upvotes: 210,
    excerpt: 'Wie balancieren wir die Notwendigkeit von Flexibilität mit der Aufrechterhaltung von Konsistenz in großen Design Systemen?',
    category: 'UI/UX Design'
  }
];

const categories = ['Alle', 'Design Trends', 'Web Design', 'Creator Tools', 'UI/UX Design'];

const CommunityPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Alle');

  const filteredTopics = activeCategory === 'Alle'
    ? discussionTopics
    : discussionTopics.filter(topic => topic.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Community</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Tausche dich mit anderen Designern aus, teile deine Arbeit und erhalte Feedback.
          </p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Neues Thema erstellen
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <div className="flex items-center gap-2 text-gray-600">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filter nach:</span>
        </div>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={`${activeCategory === category
              ? 'bg-violet-600 hover:bg-violet-700 text-white'
              : 'hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200'
            } transition-all duration-300 rounded-full px-4 py-2`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredTopics.map((topic) => (
          <Link to={`/community/${topic.id}`} key={topic.id} className="block hover:no-underline">
            <Card className="hover:shadow-lg hover:border-violet-200 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-violet-600">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{topic.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/user-${topic.id}`);
                      }}
                      className="flex items-center gap-2 hover:text-violet-600 transition-colors focus:outline-none"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={topic.avatar} alt={topic.author} />
                        <AvatarFallback>{topic.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{topic.author}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ArrowUp className="h-4 w-4" />
                      <span>{topic.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{topic.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;