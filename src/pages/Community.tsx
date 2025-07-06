import React from 'react';
import { Button } from '../components/ui/button';
import { PlusCircle } from 'lucide-react';

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
      <div className="bg-card border rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Diskussionen demnächst verfügbar</h2>
        <p className="text-muted-foreground">
          Wir arbeiten hart daran, diesen Bereich zum Leben zu erwecken. Schau bald wieder vorbei!
        </p>
      </div>
    </div>
  );
};

export default CommunityPage;
