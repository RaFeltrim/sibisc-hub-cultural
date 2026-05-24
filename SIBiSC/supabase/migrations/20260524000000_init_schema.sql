-- SIBiSC Database Initialization Schema Migration
-- Created: 2026-05-24
-- Description: Sets up the tables for library units, books, inventory, news, and events.

-- 1. Create library_units table
CREATE TABLE IF NOT EXISTS public.library_units (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    address TEXT NOT NULL,
    hours TEXT NOT NULL,
    contact TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create books table
CREATE TABLE IF NOT EXISTS public.books (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT NOT NULL,
    year INTEGER NOT NULL,
    publisher TEXT NOT NULL,
    pages INTEGER NOT NULL,
    summary TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create book_inventory table
CREATE TABLE IF NOT EXISTS public.book_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id TEXT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    unit_id TEXT NOT NULL REFERENCES public.library_units(id) ON DELETE CASCADE,
    available INTEGER NOT NULL DEFAULT 0,
    total INTEGER NOT NULL DEFAULT 0,
    call_number TEXT NOT NULL,
    shelf TEXT NOT NULL,
    distance_by_neighborhood JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT check_available_limit CHECK (available <= total)
);

-- 4. Create news_posts table
CREATE TABLE IF NOT EXISTS public.news_posts (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    title TEXT NOT NULL,
    source_label TEXT,
    source_url TEXT,
    summary TEXT NOT NULL,
    paragraphs TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    date DATE NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    title TEXT NOT NULL,
    audience TEXT NOT NULL,
    location_name TEXT NOT NULL,
    location_address TEXT NOT NULL,
    signup TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.library_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create Policies for Public Read-Only Access
CREATE POLICY "Allow public read access to library_units"
    ON public.library_units FOR SELECT USING (true);

CREATE POLICY "Allow public read access to books"
    ON public.books FOR SELECT USING (true);

CREATE POLICY "Allow public read access to book_inventory"
    ON public.book_inventory FOR SELECT USING (true);

CREATE POLICY "Allow public read access to news_posts"
    ON public.news_posts FOR SELECT USING (true);

CREATE POLICY "Allow public read access to events"
    ON public.events FOR SELECT USING (true);
