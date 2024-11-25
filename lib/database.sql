-- Enable RLS
alter table flashcard_sets enable row level security;
alter table flashcards enable row level security;
alter table user_progress enable row level security;

-- Create tables
create table if not exists flashcard_sets (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  user_id uuid references auth.users not null
);

create table if not exists flashcards (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  set_id uuid references flashcard_sets on delete cascade not null,
  front text not null,
  back text not null,
  last_reviewed timestamp with time zone,
  review_count integer default 0,
  next_review timestamp with time zone
);

create table if not exists user_progress (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  flashcard_id uuid references flashcards on delete cascade not null,
  correct_count integer default 0,
  incorrect_count integer default 0,
  last_reviewed timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
create policy "Users can view their own flashcard sets"
  on flashcard_sets for select
  using (auth.uid() = user_id);

create policy "Users can insert their own flashcard sets"
  on flashcard_sets for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own flashcard sets"
  on flashcard_sets for update
  using (auth.uid() = user_id);

create policy "Users can delete their own flashcard sets"
  on flashcard_sets for delete
  using (auth.uid() = user_id);

create policy "Users can view flashcards in their sets"
  on flashcards for select
  using (
    exists (
      select 1 from flashcard_sets
      where flashcard_sets.id = flashcards.set_id
      and flashcard_sets.user_id = auth.uid()
    )
  );

create policy "Users can insert flashcards in their sets"
  on flashcards for insert
  with check (
    exists (
      select 1 from flashcard_sets
      where flashcard_sets.id = set_id
      and flashcard_sets.user_id = auth.uid()
    )
  );

create policy "Users can update flashcards in their sets"
  on flashcards for update
  using (
    exists (
      select 1 from flashcard_sets
      where flashcard_sets.id = flashcards.set_id
      and flashcard_sets.user_id = auth.uid()
    )
  );

create policy "Users can delete flashcards in their sets"
  on flashcards for delete
  using (
    exists (
      select 1 from flashcard_sets
      where flashcard_sets.id = flashcards.set_id
      and flashcard_sets.user_id = auth.uid()
    )
  );

create policy "Users can view their own progress"
  on user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on user_progress for update
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists flashcard_sets_user_id_idx on flashcard_sets(user_id);
create index if not exists flashcards_set_id_idx on flashcards(set_id);
create index if not exists user_progress_user_id_idx on user_progress(user_id);
create index if not exists user_progress_flashcard_id_idx on user_progress(flashcard_id);