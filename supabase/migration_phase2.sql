-- Migration: Add profile fields for SaaMa competition registration
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS birthday date;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sex text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mobile text;
