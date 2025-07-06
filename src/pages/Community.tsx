import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { PlusCircle, MessageSquare, ArrowUp } from 'lucide-react';

const discussionTopics = [
  {
    id: 'glassmorphism-trend',
    title: 'Ist "Glassmorphism" noch ein relevanter Designtrend in 2024?',
    author: 'Alex Müller',
    avatar: 'https://github.com/shadcn.png',
    comments: 42,
    upvotes: 127,
    excerpt: 'Einige sagen, er ist überstrapaziert, andere halten ihn für modern. Was ist eure Meinung?'
  },
  {
    id: 'brutalism-revival',
    title: 'Das Comeback des Brutalismus im Webdesign',
    author: 'Maria Schmidt',
    avatar: 'https://github.com/maria.png',
    comments: 18,
    upvotes: 89,
    excerpt: 'Brutalismus ist wieder da, aber anders. Lasst uns die neuen Formen und Ausprägungen diskutieren.'
  },
  {
    id: 'ai-in-design-tools',
    title: 'Wie KI-Tools unseren Design-Workflow verändern',
    author: 'Jonas Weber',
    avatar: 'https://github.com/jonas.png',
    comments: 76,
    upvotes: 256,
    excerpt: 'Von Figma-Plugins bis zu Midjourney: Welche KI-Tools nutzt ihr und wie beeinflussen sie eure Arbeit?'
  }
];

const CommunityPage: React.FC = () => {
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

      <div className="space-y-6">
        {discussionTopics.map((topic) => (
          <Link to={`/community/${topic.id}`} key={topic.id} className="block hover:no-underline">
            <Card className="hover:shadow-lg hover:border-violet-200 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-violet-600">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{topic.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Link to={`/profile/user-${topic.id}`} className="flex items-center gap-2 hover:text-violet-600 transition-colors">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={topic.avatar} alt={topic.author} />
                        <AvatarFallback>{topic.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{topic.author}</span>
                    </Link>
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