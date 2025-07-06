import React from 'react';

const CommunityPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Community</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Tausche dich mit anderen Designern aus, teile deine Arbeit und erhalte Feedback.
      </p>
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
