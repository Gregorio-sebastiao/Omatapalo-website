-- Tabela de traduções de artigos (EN e FR)
-- Corre este ficheiro no SQL Editor do Supabase Dashboard

create table if not exists public.post_translations (
  id            uuid primary key default gen_random_uuid(),
  post_id       uuid not null references public.posts(id) on delete cascade,
  lang          text not null check (lang in ('en', 'fr')),
  title         text,
  slug          text,
  excerpt       text,
  content       text,
  translated_at timestamptz default now(),
  unique (post_id, lang),
  unique (lang, slug)
);

alter table public.post_translations enable row level security;

-- Público pode ler traduções de artigos publicados
create policy "Public read translations"
  on public.post_translations for select
  using (
    exists (
      select 1 from public.posts
      where id = post_translations.post_id
        and published = true
    )
  );

-- Utilizadores autenticados gerem traduções
create policy "Authenticated manage translations"
  on public.post_translations for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
