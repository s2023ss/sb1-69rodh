"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, BookOpen, Activity } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import CreateSetDialog from "@/components/create-set-dialog";

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  created_at: string;
  card_count: number;
}

export default function Dashboard() {
  const [sets, setSets] = useState<FlashcardSet[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadSets();
  }, []);

  const loadSets = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("flashcard_sets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading sets:", error);
      return;
    }

    setSets(data || []);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Set Oluştur
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sets.map((set) => (
          <Card key={set.id} className="hover:border-primary transition-colors">
            <Link href={`/sets/${set.id}`}>
              <CardHeader>
                <CardTitle>{set.title}</CardTitle>
                <CardDescription>{set.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {set.card_count} kartlar
                  </div>
                  <div className="flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    Son çalışma: Bugün
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <CreateSetDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={loadSets}
      />
    </div>
  );
}