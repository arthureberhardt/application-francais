-- ============================================================
--  Codes d'accès des élèves
--  À exécuter une fois dans Supabase : SQL Editor → New query → Run
-- ============================================================

create table if not exists codes (
  code    text primary key,
  classe  text not null,
  filiere text not null default 'gymnase'
          check (filiere in ('gymnase', 'fms')),
  annee   text,
  actif   boolean not null default true,
  cree    timestamptz not null default now()
);

create index if not exists codes_classe_idx on codes (classe);

-- ============================================================
--  Sécurité : la liste des codes ne doit jamais être lisible
-- ============================================================
-- La clé publique de l'application est, par nature, visible dans le code du
-- site. Si la table était lisible, n'importe qui pourrait télécharger tous les
-- codes de l'établissement d'un seul appel.
--
-- On interdit donc toute lecture directe, et on expose une seule fonction :
-- « ce code existe-t-il ? ». Elle répond oui ou non, et donne la classe et la
-- filière — mais elle ne permet pas d'énumérer quoi que ce soit.

alter table codes enable row level security;

-- aucune politique de lecture : personne ne peut interroger la table
drop policy if exists codes_lecture on codes;

create or replace function verifier_code(p_code text)
returns table (classe text, filiere text)
language sql
security definer            -- s'exécute avec les droits du propriétaire
set search_path = public
as $$
  select c.classe, c.filiere
  from codes c
  where upper(c.code) = upper(trim(p_code))
    and c.actif = true
  limit 1;
$$;

revoke all on function verifier_code(text) from public;
grant execute on function verifier_code(text) to anon, authenticated;

-- ============================================================
--  Retirer une volée
-- ============================================================
-- Désactiver plutôt que supprimer : les résultats restent consultables,
-- mais le code ne fonctionne plus.
--
--   update codes set actif = false where annee = '2025';
--
-- Pour effacer réellement les résultats d'une volée :
--
--   delete from progression
--   where code in (select code from codes where annee = '2025');
--   delete from codes where annee = '2025';

-- ============================================================
--  Vue enseignant : où en est chaque classe
-- ============================================================
create or replace view suivi_classes as
select
  c.classe,
  c.filiere,
  c.code,
  count(p.cle) filter (where p.boite > 0)                        as elements_travailles,
  count(p.cle) filter (where p.boite >= 5 and p.ok >= 5)         as parfaitement_connus,
  max(p.maj)                                                     as derniere_activite,
  max(p.ok) filter (where p.cle like 'examen:%')                 as dernier_examen_justes,
  max(p.essais) filter (where p.cle like 'examen:%')             as dernier_examen_total
from codes c
left join progression p on p.code = c.code
where c.actif = true
group by c.classe, c.filiere, c.code
order by c.classe, c.code;
