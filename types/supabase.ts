export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      flashcard_sets: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          user_id?: string
        }
      }
      flashcards: {
        Row: {
          id: string
          created_at: string
          set_id: string
          front: string
          back: string
          last_reviewed: string | null
          review_count: number
          next_review: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          set_id: string
          front: string
          back: string
          last_reviewed?: string | null
          review_count?: number
          next_review?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          set_id?: string
          front?: string
          back?: string
          last_reviewed?: string | null
          review_count?: number
          next_review?: string | null
        }
      }
      user_progress: {
        Row: {
          id: string
          created_at: string
          user_id: string
          flashcard_id: string
          correct_count: number
          incorrect_count: number
          last_reviewed: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          flashcard_id: string
          correct_count?: number
          incorrect_count?: number
          last_reviewed?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          flashcard_id?: string
          correct_count?: number
          incorrect_count?: number
          last_reviewed?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}