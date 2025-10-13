import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Sample data
const sampleCorruptPeople = [
  {
    id: 'person_001',
    name: 'Ahmed Ben Lahcen',
    name_ar: 'أحمد بن لحسن',
    name_amz: 'Aḥmad Uggen',
    name_fr: 'Ahmed Ben Lahcen',
    name_de: 'Ahmed Ben Lahcen',
    name_nl: 'Ahmed Ben Lahcen',
    name_pt: 'Ahmed Ben Lahcen',
    category: 'politician',
    position: 'Former Minister of Finance',
    position_ar: 'وزير المالية السابق',
    position_amz: 'Agdud n Uqaru-d Zdat',
    position_fr: 'Ancien Ministre des Finances',
    position_de: 'Ehemaliger Finanzminister',
    position_nl: 'Voormalig Minister van Financiën',
    position_pt: 'Ex-Ministro das Finanças',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    description: 'Implicated in embezzlement scheme worth 2.5 billion MAD involving public contracts',
    description_ar: 'متورط في نظام احتيال بمليارات الدراهم يتعلق بالعقود العامة',
    description_amz: 'Yettwassan deg usreḍ n umeẓlaw deg 2.5 n miliyard MAD',
    description_fr: 'Impliqué dans un programme de détournement de 2,5 milliards MAD impliquant des contrats publics',
    description_de: 'Verwickelt in ein Unterschlagungsschema in Höhe von 2,5 Milliarden MAD',
    description_nl: 'Betrokken bij verduistering ter waarde van 2,5 miljard MAD',
    description_pt: 'Implicado em esquema de apropriação indébita no valor de 2,5 bilhões de MAD',
    amount_stolen: 2500000000,
    cases_count: 3,
    status: 'convicted',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'person_004',
    name: 'Samir El Fassi',
    name_ar: 'سمير الفاسي',
    name_amz: 'Samir Lfassi',
    name_fr: 'Samir El Fassi',
    name_de: 'Samir El Fassi',
    name_nl: 'Samir El Fassi',
    name_pt: 'Samir El Fassi',
    category: 'politician',
    position: 'Former Deputy Prime Minister',
    position_ar: 'نائب رئيس الحكومة السابق',
    position_amz: 'Tanṣeft n Agduda Zdat',
    position_fr: 'Ancien Vice-Premier Ministre',
    position_de: 'Ehemaliger stellvertretender Premierminister',
    position_nl: 'Voormalig Vice-Premiers Minister',
    position_pt: 'Ex-Vice-Primeiro Ministro',
    image_url: 'https://images.unsplash.com/photo-1500564175855-0b4f79d75e15?w=500&h=500&fit=crop',
    description: 'Money laundering through real estate transactions, 3.2 billion MAD traced',
    description_ar: 'تبييض أموال من خلال معاملات العقارات، 3.2 مليار درهم',
    description_amz: 'Asreḍ n umeẓlaw seg ubrid n waddaren imudanen',
    description_fr: 'Blanchiment d\'argent par des transactions immobilières',
    description_de: 'Geldwäsche durch Immobilientransaktionen',
    description_nl: 'Witwassen via vastgoeadtransacties',
    description_pt: 'Lavagem de dinheiro por meio de transações imobiliárias',
    amount_stolen: 3200000000,
    cases_count: 4,
    status: 'investigated',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'person_007',
    name: 'Rashid Al-Mansour',
    name_ar: 'راشد المنصور',
    name_amz: 'Rašid Unṣur',
    name_fr: 'Rachid Al-Mansour',
    name_de: 'Rashid Al-Mansour',
    name_nl: 'Rashid Al-Mansour',
    name_pt: 'Rashid Al-Mansour',
    category: 'politician',
    position: 'Member of Parliament',
    position_ar: 'عضو البرلمان',
    position_amz: 'Umewwel n Tagduda',
    position_fr: 'Membre du Parlement',
    position_de: 'Parlamentsmitglied',
    position_nl: 'Parlementslid',
    position_pt: 'Membro do Parlamento',
    image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
    description: 'Extortion and illegal land acquisition, 650 million MAD involved',
    description_ar: 'ابتزاز واستحواذ غير قانوني على الأراضي',
    description_amz: 'Tafsut deg umeẓlaw n 650 n miliyard MAD',
    description_fr: 'Extorsion et acquisition illégale de terres',
    description_de: 'Erpressung und illegaler Landerwerb',
    description_nl: 'Afpersing en illegale grondverwervingen',
    description_pt: 'Extorsão e aquisição ilegal de terras',
    amount_stolen: 650000000,
    cases_count: 2,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'person_002',
    name: 'Fatima Al-Mansouri',
    name_ar: 'فاطمة المنصوري',
    name_amz: 'Fatima Unṣuri',
    name_fr: 'Fatima Al-Mansouri',
    name_de: 'Fatima Al-Mansouri',
    name_nl: 'Fatima Al-Mansouri',
    name_pt: 'Fatima Al-Mansouri',
    category: 'businessman',
    position: 'CEO of Construction Company',
    position_ar: 'الرئيس التنفيذي لشركة البناء',
    position_amz: 'Agdud n Waddaren',
    position_fr: 'PDG de Société de Construction',
    position_de: 'Geschäftsführer des Bauunternehmens',
    position_nl: 'CEO van Bouwbedrijf',
    position_pt: 'CEO da Empresa de Construção',
    image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
    description: 'Bribery scandal involving infrastructure projects, 1.8 billion MAD in bribes',
    description_ar: 'فضيحة الرشوة التي تتعلق بمشاريع البنية التحتية',
    description_amz: 'Tuffra n uqaru-d deg 1.8 n miliyard MAD',
    description_fr: 'Scandale de pot-de-vin impliquant des projets d\'infrastructure',
    description_de: 'Bestechungsskandal bei Infrastrukturprojekten',
    description_nl: 'Omkoopschandaal met betrekking tot infrastructuurprojecten',
    description_pt: 'Escândalo de suborno envolvendo projetos de infraestrutura',
    amount_stolen: 1800000000,
    cases_count: 5,
    status: 'investigated',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'person_005',
    name: 'Hassan Al-Qadi',
    name_ar: 'حسن القاضي',
    name_amz: 'Ḥasan Lgadi',
    name_fr: 'Hassan Al-Qadi',
    name_de: 'Hassan Al-Qadi',
    name_nl: 'Hassan Al-Qadi',
    name_pt: 'Hassan Al-Qadi',
    category: 'businessman',
    position: 'Owner of Mining Company',
    position_ar: 'مالك شركة التعدين',
    position_amz: 'Agdud n Tmagla',
    position_fr: 'Propriétaire de Société d\'Exploitation Minière',
    position_de: 'Besitzer des Bergbauunternehmens',
    position_nl: 'Eigenaar van Mijnbouwbedrijf',
    position_pt: 'Proprietário da Empresa de Mineração',
    image_url: 'https://images.unsplash.com/photo-1507527336639-c8c91c4e32d3?w=500&h=500&fit=crop',
    description: 'Tax evasion and environmental crimes, 2.1 billion MAD in losses',
    description_ar: 'التهرب الضريبي والجرائم البيئية',
    description_amz: 'Tafsut deg umeẓlaw n 2.1 n miliyard MAD',
    description_fr: 'Évasion fiscale et crimes environnementaux',
    description_de: 'Steuerhinterziehung und Umweltverbrechen',
    description_nl: 'Belastingontduiking en milieudelicten',
    description_pt: 'Evasão fiscal e crimes ambientais',
    amount_stolen: 2100000000,
    cases_count: 3,
    status: 'convicted',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'person_008',
    name: 'Layla Benkirane',
    name_ar: 'ليلى بنكيران',
    name_amz: 'Layla Igira',
    name_fr: 'Layla Benkirane',
    name_de: 'Layla Benkirane',
    name_nl: 'Layla Benkirane',
    name_pt: 'Layla Benkirane',
    category: 'businessman',
    position: 'Head of Import Export Firm',
    position_ar: 'رئيسة شركة الاستيراد والتصدير',
    position_amz: 'Agdud n Tfelwit',
    position_fr: 'Chef de l\'Entreprise d\'Import-Export',
    position_de: 'Leiterin der Import-Export-Firma',
    position_nl: 'Hoofd van Import-Exportbedrijf',
    position_pt: 'Chefe da Empresa de Importação-Exportação',
    image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
    description: 'Smuggling and customs fraud, 1.2 billion MAD in contraband',
    description_ar: 'التهريب والاحتيال الجمركي',
    description_amz: 'Tafsut deg umeẓlaw n 1.2 n miliyard MAD',
    description_fr: 'Contrebande et fraude douanière',
    description_de: 'Schmuggel und Zollbetrug',
    description_nl: 'Smokkel en douanefraude',
    description_pt: 'Contrabando e fraude alfandegária',
    amount_stolen: 1200000000,
    cases_count: 2,
    status: 'investigated',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'person_003',
    name: 'Mohammed Karim Hassan',
    name_ar: 'محمد كريم حسن',
    name_amz: 'Muḥemmad Krim Ḥasan',
    name_fr: 'Mohammed Karim Hassan',
    name_de: 'Mohammed Karim Hassan',
    name_nl: 'Mohammed Karim Hassan',
    name_pt: 'Mohammed Karim Hassan',
    category: 'official',
    position: 'Director of Public Works',
    position_ar: 'مدير الأشغال العامة',
    position_amz: 'Agdud n Ttira Umḍan',
    position_fr: 'Directeur des Travaux Publics',
    position_de: 'Direktor der Öffentlichen Arbeiten',
    position_nl: 'Directeur van Openbare Werken',
    position_pt: 'Diretor de Obras Públicas',
    image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
    description: 'Fraud in tender processes, 850 million MAD in illegal gains',
    description_ar: 'احتيال في عمليات المناقصة، مكاسب غير قانونية بقيمة 850 مليون درهم',
    description_amz: 'Tafsut deg umeẓlaw n 850 n miliyard MAD',
    description_fr: 'Fraude dans les processus d\'appel d\'offres',
    description_de: 'Betrug bei Ausschreibungsverfahren',
    description_nl: 'Fraude in aanbestedingsprocedures',
    description_pt: 'Fraude em processos de licitação',
    amount_stolen: 850000000,
    cases_count: 2,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'person_006',
    name: 'Noor Al-Zahra',
    name_ar: 'نور الزهراء',
    name_amz: 'Nur Azra',
    name_fr: 'Noor Al-Zahra',
    name_de: 'Noor Al-Zahra',
    name_nl: 'Noor Al-Zahra',
    name_pt: 'Noor Al-Zahra',
    category: 'official',
    position: 'Head of Health Ministry Procurement',
    position_ar: 'رئيسة المشتريات بوزارة الصحة',
    position_amz: 'Agdud n Umusan n Tsva',
    position_fr: 'Chef des Achats du Ministère de la Santé',
    position_de: 'Leiterin der Beschaffung des Gesundheitsministeriums',
    position_nl: 'Hoofd van Gezondheidsministerie-inkoopvraag',
    position_pt: 'Chefe de Compras do Ministério da Saúde',
    image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
    description: 'Medical supply kickbacks scheme, 1.5 billion MAD misappropriated',
    description_ar: 'نظام العمولات من توريد المستلزمات الطبية',
    description_amz: 'Usreḍ n umeẓlaw seg ubrid n Tussna',
    description_fr: 'Système de commission sur les fournitures médicales',
    description_de: 'Provisionsschema für medizinische Versorgung',
    description_nl: 'Commissiesysteem voor medische benodigdheden',
    description_pt: 'Esquema de comissão de abastecimento médico',
    amount_stolen: 1500000000,
    cases_count: 3,
    status: 'investigated',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'person_009',
    name: 'Abdelaziz Bennani',
    name_ar: 'عبدالعزيز البناني',
    name_amz: 'Abdelaziz Igiren',
    name_fr: 'Abdelaziz Bennani',
    name_de: 'Abdelaziz Bennani',
    name_nl: 'Abdelaziz Bennani',
    name_pt: 'Abdelaziz Bennani',
    category: 'official',
    position: 'Regional Governor',
    position_ar: 'والي إقليمي',
    position_amz: 'Agdud n Iswalen',
    position_fr: 'Gouverneur Régional',
    position_de: 'Regionalgouverneur',
    position_nl: 'Regionaal Gouverneur',
    position_pt: 'Governador Regional',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    description: 'Land appropriation and abuse of power, 920 million MAD in seized assets',
    description_ar: 'مصادرة الأراضي وإساءة استخدام السلطة',
    description_amz: 'Asreḍ n umeẓlaw seg ubrid n twacult',
    description_fr: 'Appropriation des terres et abus de pouvoir',
    description_de: 'Landaneignung und Machtmissbrauch',
    description_nl: 'Landaaneignïng en machtsmisbruik',
    description_pt: 'Apropriação de terras e abuso de poder',
    amount_stolen: 920000000,
    cases_count: 2,
    status: 'convicted',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const sampleCases = [
  {
    id: 'case_001',
    person_id: 'person_001',
    title: 'Finance Ministry Embezzlement Scheme',
    title_ar: 'نظام الاختلاس في وزارة المالية',
    title_amz: 'Tuffra n umeẓlaw deg Tagduda',
    title_fr: 'Système de détournement du Ministère des Finances',
    title_de: 'Unterschlagungssystem des Finanzministeriums',
    title_nl: 'Verduisteringsregeling van het Ministerie van Financiën',
    title_pt: 'Esquema de Apropriação Indébita do Ministério das Finanças',
    description: 'Investigation into misappropriation of public funds through fake contracts',
    description_ar: 'تحقيق في تحويل الأموال العامة من خلال عقود مزيفة',
    description_amz: 'Asarḍ ɣef umeẓlaw deg Waddaren Udmawan',
    description_fr: 'Enquête sur le détournement de fonds publics par des contrats fictifs',
    description_de: 'Untersuchung von Unterschlagung öffentlicher Mittel durch gefälschte Verträge',
    description_nl: 'Onderzoek naar ontvreemding van openbare middelen via nepcontracten',
    description_pt: 'Investigação sobre apropriação indébita de fundos públicos por meio de contratos fictícios',
    amount: 2500000000,
    date: '2023-06-15',
    evidence_urls: ['https://example.com/evidence1', 'https://example.com/evidence2'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'case_002',
    person_id: 'person_002',
    title: 'Construction Contract Bribery',
    title_ar: 'الرشوة في عقود البناء',
    title_amz: 'Uqaru-d deg Waddaren n Tsertit',
    title_fr: 'Pot-de-vin dans les contrats de construction',
    title_de: 'Bestechung bei Bauverträgen',
    title_nl: 'Omkoopvergrijp bij bouwcontracten',
    title_pt: 'Suborno em Contratos de Construção',
    description: 'Systematic bribery to government officials for awarding construction projects',
    description_ar: 'رشوة منهجية لموظفي حكوميين لمنح مشاريع بناء',
    description_amz: 'Uqaru-d deg Tsertit n Waddaren',
    description_fr: 'Pots-de-vin systématiques aux fonctionnaires du gouvernement',
    description_de: 'Systematische Bestechung von Regierungsbeamten',
    description_nl: 'Systematische omkoopvergrijpen van overheidsambtenaren',
    description_pt: 'Suborno sistemático de funcionários do governo',
    amount: 1800000000,
    date: '2024-02-20',
    evidence_urls: ['https://example.com/evidence3', 'https://example.com/evidence4'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'case_003',
    person_id: 'person_003',
    title: 'Tender Process Fraud',
    title_ar: 'احتيال عملية المناقصة',
    title_amz: 'Tafsut deg Umeẓlaw',
    title_fr: 'Fraude dans le Processus d\'Appel d\'Offres',
    title_de: 'Betrug bei Ausschreibungsverfahren',
    title_nl: 'Fraude bij Aanbestedingsprocedure',
    title_pt: 'Fraude no Processo de Licitação',
    description: 'Manipulation of tender processes to favor specific companies in exchange for kickbacks',
    description_ar: 'التلاعب بعمليات المناقصة لصالح شركات معينة مقابل رشاوي',
    description_amz: 'Tafsut deg Waddaren n Umeẓlaw',
    description_fr: 'Manipulation des processus d\'appel d\'offres au profit d\'entreprises spécifiques',
    description_de: 'Manipulation von Ausschreibungsverfahren zugunsten bestimmter Unternehmen',
    description_nl: 'Manipulatie van aanbestedingsprocedures ten gunste van specifieke bedrijven',
    description_pt: 'Manipulação de processos de licitação em favor de empresas específicas',
    amount: 850000000,
    date: '2024-01-10',
    evidence_urls: ['https://example.com/evidence5'],
    created_at: new Date().toISOString(),
  },
];

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting data insertion...');

    // Insert corrupt people
    console.log('\n📝 Inserting corrupt people...');
    const { error: peopleError } = await supabase
      .from('corrupt_people')
      .insert(sampleCorruptPeople);

    if (peopleError) {
      console.error('❌ Error inserting corrupt people:', peopleError);
      return NextResponse.json({ error: peopleError.message }, { status: 500 });
    }
    console.log('✅ Successfully inserted 9 corrupt people');

    // Insert corruption cases
    console.log('\n📝 Inserting corruption cases...');
    const { error: casesError } = await supabase
      .from('corruption_cases')
      .insert(sampleCases);

    if (casesError) {
      console.error('❌ Error inserting cases:', casesError);
      return NextResponse.json({ error: casesError.message }, { status: 500 });
    }
    console.log('✅ Successfully inserted 3 corruption cases');

    // Update statistics
    console.log('\n📊 Updating statistics...');
    const totalStolen = sampleCorruptPeople.reduce(
      (sum, person) => sum + (person.amount_stolen || 0),
      0
    );

    const { error: statsError } = await supabase
      .from('statistics')
      .upsert({
        total_corrupt: sampleCorruptPeople.length,
        total_stolen: totalStolen,
        cases_active: sampleCorruptPeople.filter(p => p.status === 'active').length,
        convictions: sampleCorruptPeople.filter(p => p.status === 'convicted').length,
      });

    if (statsError) {
      console.error('❌ Error updating statistics:', statsError);
      return NextResponse.json({ error: statsError.message }, { status: 500 });
    }

    console.log('✅ Statistics updated successfully');
    console.log(`   - Total corrupt: ${sampleCorruptPeople.length}`);
    console.log(`   - Total stolen: ${totalStolen.toLocaleString()} MAD`);
    console.log(`   - Active cases: ${sampleCorruptPeople.filter(p => p.status === 'active').length}`);
    console.log(`   - Convictions: ${sampleCorruptPeople.filter(p => p.status === 'convicted').length}`);

    return NextResponse.json({
      success: true,
      message: '✨ Data insertion completed successfully!',
      stats: {
        people: sampleCorruptPeople.length,
        cases: sampleCases.length,
        totalStolen: totalStolen,
      },
    });
  } catch (error) {
    console.error('💥 Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to seed data' },
      { status: 500 }
    );
  }
}
