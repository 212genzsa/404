// app/api/seed-data/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add a secret key for security
const SEED_SECRET = process.env.SEED_SECRET_KEY!;

interface CorruptPerson {
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

interface CorruptionCase {
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

// Sample data (paste your expanded data here)
const sampleCorruptPeople: CorruptPerson[] = [
  // PASTE YOUR 9 CORRUPT PEOPLE HERE
];

const sampleCases: CorruptionCase[] = [
  // PASTE YOUR CORRUPTION CASES HERE
];

export async function POST(request: NextRequest) {
  try {
    // Security check
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${SEED_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🚀 Starting data insertion...');

    // Insert corrupt people
    console.log('\n📝 Inserting corrupt people...');
    const { data: peopleData, error: peopleError } = await supabase
      .from('corrupt_people')
      .insert(sampleCorruptPeople)
      .select();

    if (peopleError) {
      console.error('❌ Error inserting corrupt people:', peopleError);
      return NextResponse.json(
        { error: `Failed to insert people: ${peopleError.message}` },
        { status: 500 }
      );
    }

    console.log('✅ Successfully inserted', sampleCorruptPeople.length, 'corrupt people');

    // Insert corruption cases
    console.log('\n📝 Inserting corruption cases...');
    const { data: casesData, error: casesError } = await supabase
      .from('corruption_cases')
      .insert(sampleCases)
      .select();

    if (casesError) {
      console.error('❌ Error inserting cases:', casesError);
      return NextResponse.json(
        { error: `Failed to insert cases: ${casesError.message}` },
        { status: 500 }
      );
    }

    console.log('✅ Successfully inserted', sampleCases.length, 'corruption cases');

    // Update statistics
    console.log('\n📊 Updating statistics...');
    const totalStolen = sampleCorruptPeople.reduce((sum, person) => 
      sum + (person.amount_stolen || 0), 0
    );

    const { data: statsData, error: statsError } = await supabase
      .from('statistics')
      .upsert({
        id: 1,
        total_corrupt: sampleCorruptPeople.length,
        total_stolen: totalStolen,
        cases_active: sampleCorruptPeople.filter(p => p.status === 'active').length,
        convictions: sampleCorruptPeople.filter(p => p.status === 'convicted').length,
      }, { onConflict: 'id' });

    if (statsError) {
      console.error('❌ Error updating statistics:', statsError);
      return NextResponse.json(
        { error: `Failed to update statistics: ${statsError.message}` },
        { status: 500 }
      );
    }

    console.log('✅ Statistics updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Data seeded successfully',
      summary: {
        peopleInserted: sampleCorruptPeople.length,
        casesInserted: sampleCases.length,
        totalStolen: totalStolen,
        activeCase: sampleCorruptPeople.filter(p => p.status === 'active').length,
        convictions: sampleCorruptPeople.filter(p => p.status === 'convicted').length,
      }
    });

  } catch (error) {
    console.error('💥 Unexpected error:', error);
    return NextResponse.json(
      { error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown'}` },
      { status: 500 }
    );
  }
}
