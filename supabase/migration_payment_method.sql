-- Add payment_method column to registrations table
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'stripe';
