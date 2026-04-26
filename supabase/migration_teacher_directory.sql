-- Teacher Directory table for the admin-managed school directory
CREATE TABLE IF NOT EXISTS teacher_directory (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    services TEXT[] DEFAULT '{}',
    location TEXT NOT NULL,
    website TEXT,
    facebook TEXT,
    instagram TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow public read access
ALTER TABLE teacher_directory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on teacher_directory"
    ON teacher_directory FOR SELECT
    USING (true);

CREATE POLICY "Allow service role full access on teacher_directory"
    ON teacher_directory FOR ALL
    USING (true)
    WITH CHECK (true);
