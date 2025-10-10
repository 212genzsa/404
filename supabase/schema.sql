-- Create corrupt_people table
CREATE TABLE IF NOT EXISTS corrupt_people (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_ar TEXT,
  name_amz TEXT,
  name_fr TEXT,
  name_de TEXT,
  name_nl TEXT,
  name_pt TEXT,
  category TEXT NOT NULL CHECK (category IN ('politician', 'businessman', 'official')),
  position TEXT NOT NULL,
  position_ar TEXT,
  position_amz TEXT,
  position_fr TEXT,
  position_de TEXT,
  position_nl TEXT,
  position_pt TEXT,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ar TEXT,
  description_amz TEXT,
  description_fr TEXT,
  description_de TEXT,
  description_nl TEXT,
  description_pt TEXT,
  amount_stolen BIGINT,
  cases_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'convicted', 'investigated')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create corruption_cases table
CREATE TABLE IF NOT EXISTS corruption_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID NOT NULL REFERENCES corrupt_people(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_ar TEXT,
  title_amz TEXT,
  title_fr TEXT,
  title_de TEXT,
  title_nl TEXT,
  title_pt TEXT,
  description TEXT NOT NULL,
  description_ar TEXT,
  description_amz TEXT,
  description_fr TEXT,
  description_de TEXT,
  description_nl TEXT,
  description_pt TEXT,
  amount BIGINT,
  date DATE NOT NULL,
  evidence_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_corrupt INTEGER DEFAULT 0,
  total_stolen BIGINT DEFAULT 0,
  cases_active INTEGER DEFAULT 0,
  convictions INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial statistics row
INSERT INTO statistics (id, total_corrupt, total_stolen, cases_active, convictions)
VALUES (uuid_generate_v4(), 0, 0, 0, 0)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_corrupt_people_category ON corrupt_people(category);
CREATE INDEX IF NOT EXISTS idx_corrupt_people_status ON corrupt_people(status);
CREATE INDEX IF NOT EXISTS idx_corruption_cases_person_id ON corruption_cases(person_id);
CREATE INDEX IF NOT EXISTS idx_corruption_cases_date ON corruption_cases(date DESC);

-- Function to update cases_count
CREATE OR REPLACE FUNCTION update_cases_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE corrupt_people
  SET cases_count = (
    SELECT COUNT(*) FROM corruption_cases WHERE person_id = NEW.person_id
  )
  WHERE id = NEW.person_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update cases_count
CREATE TRIGGER trigger_update_cases_count
AFTER INSERT OR DELETE ON corruption_cases
FOR EACH ROW
EXECUTE FUNCTION update_cases_count();

-- Function to update statistics
CREATE OR REPLACE FUNCTION update_statistics()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE statistics
  SET 
    total_corrupt = (SELECT COUNT(*) FROM corrupt_people),
    total_stolen = (SELECT COALESCE(SUM(amount_stolen), 0) FROM corrupt_people),
    cases_active = (SELECT COUNT(*) FROM corrupt_people WHERE status = 'active'),
    convictions = (SELECT COUNT(*) FROM corrupt_people WHERE status = 'convicted'),
    updated_at = NOW()
  WHERE id = (SELECT id FROM statistics LIMIT 1);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update statistics
CREATE TRIGGER trigger_update_stats_insert
AFTER INSERT ON corrupt_people
FOR EACH ROW
EXECUTE FUNCTION update_statistics();

CREATE TRIGGER trigger_update_stats_update
AFTER UPDATE ON corrupt_people
FOR EACH ROW
EXECUTE FUNCTION update_statistics();

CREATE TRIGGER trigger_update_stats_delete
AFTER DELETE ON corrupt_people
FOR EACH ROW
EXECUTE FUNCTION update_statistics();

-- Enable Row Level Security
ALTER TABLE corrupt_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE corruption_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on corrupt_people"
ON corrupt_people FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on corruption_cases"
ON corruption_cases FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on statistics"
ON statistics FOR SELECT
TO public
USING (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('corrupt-evidence', 'corrupt-evidence', true)
ON CONFLICT DO NOTHING;

-- Allow public access to storage
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'corrupt-evidence');

CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'corrupt-evidence');
