import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface CorruptPerson {
  id: string;
  name: string;
  name_ar: string;
  name_amz: string;
  name_fr: string;
  name_de: string;
  name_nl: string;
  name_pt: string;
  category: 'politician' | 'businessman' | 'official';
  position: string;
  position_ar: string;
  position_amz: string;
  position_fr: string;
  position_de: string;
  position_nl: string;
  position_pt: string;
  image_url: string;
  description: string;
  description_ar: string;
  description_amz: string;
  description_fr: string;
  description_de: string;
  description_nl: string;
  description_pt: string;
  amount_stolen?: number;
  cases_count: number;
  status: 'active' | 'convicted' | 'investigated';
  created_at: string;
  updated_at: string;
}

export interface CorruptionCase {
  id: string;
  person_id: string;
  title: string;
  title_ar: string;
  title_amz: string;
  title_fr: string;
  title_de: string;
  title_nl: string;
  title_pt: string;
  description: string;
  description_ar: string;
  description_amz: string;
  description_fr: string;
  description_de: string;
  description_nl: string;
  description_pt: string;
  amount?: number;
  date: string;
  evidence_urls: string[];
  created_at: string;
}

export interface Statistics {
  total_corrupt: number;
  total_stolen: number;
  cases_active: number;
  convictions: number;
}
