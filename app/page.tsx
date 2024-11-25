import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, Share2, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Akıllı Öğrenme",
      description: "Spaced repetition ile etkili öğrenme deneyimi",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Kişiselleştirilmiş Setler",
      description: "Kendi flashcard setlerinizi oluşturun ve düzenleyin",
    },
    {
      icon: <Share2 className="h-8 w-8" />,
      title: "Paylaşım ve İşbirliği",
      description: "Setlerinizi paylaşın ve başkalarının setlerinden öğrenin",
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: "İlerleme Takibi",
      description: "Öğrenme sürecinizi detaylı istatistiklerle takip edin",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Modern Flashcard Uygulaması
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Etkili öğrenme için akıllı flashcard sistemi. Kendi kartlarınızı oluşturun,
          paylaşın ve öğrenme sürecinizi takip edin.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">Başla</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Daha Fazla Bilgi</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-2">
            <CardHeader>
              <div className="mb-4 text-primary">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}