import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { ArrowUp, ArrowDown, MessageSquare, ImagePlus, Send } from 'lucide-react';

const DiscussionTopicPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Discussion Thesis */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-start mb-4">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Ist "Glassmorphism" noch ein relevanter Designtrend in 2024?</h1>
              <p className="text-sm text-muted-foreground">Gepostet von <span className="font-semibold text-primary">Alex Müller</span> vor 2 Stunden</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Ich habe in letzter Zeit viele Diskussionen über den "Glassmorphism"-Effekt gesehen. Einige sagen, er ist überstrapaziert und veraltet, während andere ihn immer noch für modern und elegant halten. Was ist eure Meinung dazu? Ist es noch sinnvoll, diesen Stil in neuen Projekten einzusetzen oder sollten wir uns auf andere Trends konzentrieren?
          </p>

          {/* Image Uploads Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <img src="https://images.unsplash.com/photo-1617042375876-a13e36732a04?q=80&w=2070&auto=format&fit=crop" alt="Glassmorphism Example 1" className="rounded-lg object-cover aspect-video" />
            <img src="https://images.unsplash.com/photo-1607225298285-393c6448db58?q=80&w=1974&auto=format&fit=crop" alt="Glassmorphism Example 2" className="rounded-lg object-cover aspect-video" />
            <div className="border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 aspect-video">
              <div className="text-center text-muted-foreground">
                <ImagePlus className="mx-auto h-8 w-8 mb-2" />
                <span>Max. 3 Fotos</span>
              </div>
            </div>
          </div>

          {/* Rating Tool */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border rounded-full p-1">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <ArrowUp className="h-5 w-5" />
              </Button>
              <span className="font-bold text-lg w-8 text-center">127</span>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
              <span>42 Kommentare</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comment Input */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Kommentar hinterlassen</h2>
        <div className="relative">
          <Textarea placeholder="Schreibe deine Meinung..." className="pr-20" rows={4} />
          <Button variant="ghost" size="icon" className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-primary">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Kommentare</h2>
        <div className="space-y-6">
          {/* Comment 1 */}
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/eva.png" alt="@eva" />
              <AvatarFallback>EV</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-semibold">Eva Schmidt</p>
                <p className="text-sm text-muted-foreground mb-2">vor 1 Stunde</p>
                <p>Ich finde, es kommt stark auf den Kontext an. Für eine Finanz-App kann es sehr modern und vertrauenswürdig wirken, aber für eine verspielte Social-Media-App vielleicht weniger.</p>
              </div>
            </div>
          </div>
          {/* Comment 2 */}
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/max.png" alt="@max" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-semibold">Max Mustermann</p>
                <p className="text-sm text-muted-foreground mb-2">vor 30 Minuten</p>
                <p>Guter Punkt, Eva! Man sollte auch die Performance nicht vergessen. Zu viele transparente Layer können auf älteren Geräten schnell zu Problemen führen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionTopicPage;
