export type UserRole = 'subscriber' | 'member' | 'corporate' | 'admin'
export type ContentType = 'video' | 'text' | 'mixed'
export type ModuleStatus = 'not_started' | 'in_progress' | 'exam_pending' | 'completed'
export type ContactType = 'b2c' | 'b2b' | 'partnership'
export type ImpactType = 'environmental' | 'social' | 'economic'
export type AvailabilityType = 'b2c' | 'b2b'

export interface Profile {
  id: string
  role: UserRole
  full_name: string | null
  email: string | null
  country: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface EntrepreneurProfile {
  id: string
  user_id: string
  business_name: string
  business_description: string | null
  sector: string | null
  impact_type: ImpactType[] | null
  country: string | null
  website: string | null
  available_for: AvailabilityType[] | null
  impact_metrics: ImpactMetrics | null
  ai_context: AIContext
  is_published: boolean
  approved_at: string | null
  approved_by: string | null
  created_at: string
}

export interface ImpactMetrics {
  employees?: number
  co2_reduced?: number
  communities?: number
  [key: string]: number | undefined
}

export interface AIContext {
  business_summary?: string
  exam_responses?: Record<string, string[]>
  deliverables?: Record<string, GeneratedDeliverable>
  last_updated?: string
}

export interface GeneratedDeliverable {
  content: string
  generated_at: string
  module_id: string
  deliverable_type: string
}

export interface Course {
  id: string
  title: string
  description: string | null
  slug: string
  is_published: boolean
  order_index: number | null
  created_at: string
}

export interface CourseModule {
  id: string
  course_id: string
  title: string
  content_type: ContentType | null
  content_url: string | null
  content_summary: string | null
  deliverable_type: string | null
  deliverable_description: string | null
  order_index: number | null
  created_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  started_at: string
  completed_at: string | null
}

export interface ModuleProgress {
  id: string
  user_id: string
  module_id: string
  status: ModuleStatus
  exam_conversation: ChatMessage[]
  exam_passed_at: string | null
  deliverable: GeneratedDeliverable | null
  deliverable_generated_at: string | null
  created_at: string
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: string
}

export interface Certification {
  id: string
  user_id: string
  course_id: string | null
  badge_type: string
  badge_url: string | null
  issued_at: string
  issued_by: string | null
  verification_url: string | null
}

export interface MarketplaceContact {
  id: string
  from_user_id: string
  to_entrepreneur_id: string
  message: string | null
  contact_type: ContactType
  status: string
  created_at: string
}

// Supabase Database generic type map
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & {
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Profile, 'id'>>
      }
      entrepreneur_profiles: {
        Row: EntrepreneurProfile
        Insert: Omit<EntrepreneurProfile, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<EntrepreneurProfile, 'id'>>
      }
      courses: {
        Row: Course
        Insert: Omit<Course, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<Course, 'id'>>
      }
      course_modules: {
        Row: CourseModule
        Insert: Omit<CourseModule, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<CourseModule, 'id'>>
      }
      enrollments: {
        Row: Enrollment
        Insert: Omit<Enrollment, 'id' | 'started_at'> & {
          id?: string
          started_at?: string
        }
        Update: Partial<Omit<Enrollment, 'id'>>
      }
      module_progress: {
        Row: ModuleProgress
        Insert: Omit<ModuleProgress, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<ModuleProgress, 'id'>>
      }
      certifications: {
        Row: Certification
        Insert: Omit<Certification, 'id' | 'issued_at'> & {
          id?: string
          issued_at?: string
        }
        Update: Partial<Omit<Certification, 'id'>>
      }
      marketplace_contacts: {
        Row: MarketplaceContact
        Insert: Omit<MarketplaceContact, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<MarketplaceContact, 'id'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
