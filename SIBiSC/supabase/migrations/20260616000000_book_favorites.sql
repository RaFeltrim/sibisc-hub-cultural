-- Book favorites linked to auth.users and public.books
CREATE TABLE IF NOT EXISTS public.book_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    book_id TEXT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT book_favorites_user_book_unique UNIQUE (user_id, book_id)
);

CREATE INDEX IF NOT EXISTS book_favorites_user_id_idx ON public.book_favorites (user_id);
CREATE INDEX IF NOT EXISTS book_favorites_book_id_idx ON public.book_favorites (book_id);

ALTER TABLE public.book_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites"
    ON public.book_favorites
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorites"
    ON public.book_favorites
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorites"
    ON public.book_favorites
    FOR DELETE
    USING (auth.uid() = user_id);
