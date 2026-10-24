-- Only read counters. No notification triggers, scheduled jobs or external services.
create table private.content_open_readers (
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,item_key text not null,last_viewed_on date not null,
  primary key(user_id,kind,item_key)
);
create table private.content_open_counts (
  kind text not null,item_key text not null,view_count bigint not null default 0,
  primary key(kind,item_key)
);
alter table private.content_open_readers enable row level security;
alter table private.content_open_counts enable row level security;
revoke all on private.content_open_readers,private.content_open_counts from public,anon,authenticated;

create function private.can_count_content_open(p_kind text,p_key text,p_record boolean)
returns boolean language plpgsql stable security definer set search_path='' as $$
begin
  if auth.uid() is null or p_key is null or length(p_key)>150 then return false; end if;
  case p_kind
    when 'story' then return p_key in ('turtle-monkey','star-tree','journey-west-1','geomungo');
    when 'material' then
      return exists(select 1 from public.shared_materials s where s.id::text=p_key)
        and (not p_record or exists(select 1 from public.profiles p where p.id=auth.uid() and p.membership_type='teacher' and p.verification_status='verified'));
    when 'recruitment' then return exists(select 1 from public.recruitment_notices r where r.id::text=p_key);
    else return false;
  end case;
end $$;
revoke all on function private.can_count_content_open(text,text,boolean) from public,anon,authenticated;

create function public.onmaeum_open_counts(p_kind text,p_keys text[])
returns table(item_key text,view_count bigint) language sql stable security definer set search_path='' as $$
  select k.key,coalesce(c.view_count,0) from unnest(p_keys[1:100]) as k(key)
  left join private.content_open_counts c on c.kind=p_kind and c.item_key=k.key
  where private.can_count_content_open(p_kind,k.key,false);
$$;
create function public.onmaeum_record_open(p_kind text,p_key text)
returns bigint language plpgsql security definer set search_path='' as $$
declare added boolean; total bigint;
begin
  if not private.can_count_content_open(p_kind,p_key,true) then raise exception '열람 권한이 없습니다.' using errcode='42501'; end if;
  insert into private.content_open_readers(user_id,kind,item_key,last_viewed_on)
  values(auth.uid(),p_kind,p_key,(now() at time zone 'Asia/Seoul')::date)
  on conflict(user_id,kind,item_key) do update set last_viewed_on=excluded.last_viewed_on
  where private.content_open_readers.last_viewed_on<excluded.last_viewed_on
  returning true into added;
  if added then
    insert into private.content_open_counts(kind,item_key,view_count) values(p_kind,p_key,1)
    on conflict(kind,item_key) do update set view_count=private.content_open_counts.view_count+1;
  end if;
  select c.view_count into total from private.content_open_counts c where c.kind=p_kind and c.item_key=p_key;
  return coalesce(total,0);
end $$;
revoke all on function public.onmaeum_open_counts(text,text[]),public.onmaeum_record_open(text,text) from public,anon,authenticated;
grant execute on function public.onmaeum_open_counts(text,text[]),public.onmaeum_record_open(text,text) to authenticated;
