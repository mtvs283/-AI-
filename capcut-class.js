(async function(){
  const $=id=>document.getElementById(id);
  const client=window.supabase.createClient('https://xrrgfbidtzsohddiwcbn.supabase.co','sb_publishable_W7QqGrgNUQ77KgRtdSaANA_F4zrqp8P');
  const {data:{user},error:authError}=await client.auth.getUser();
  if(authError||!user){$('class-gate').textContent='등록 교사 계정으로 로그인한 뒤 신청해 주세요.';$('class-account').hidden=false;return;}
  const {data:profile,error}=await client.from('profiles').select('membership_type,verification_status').eq('id',user.id).maybeSingle();
  if(error||profile?.membership_type!=='teacher'||profile?.verification_status!=='verified'){$('class-gate').textContent='교사 인증이 완료된 등록 교사만 신청할 수 있습니다.';$('class-account').hidden=false;return;}
  $('class-gate').textContent='등록 교사 인증을 확인했습니다.';
  const {data:existing,error:listError}=await client.from('capcut_class_requests').select('created_at').eq('user_id',user.id).maybeSingle();
  if(listError){$('class-status').textContent='신청 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';return;}
  if(existing){$('class-status').textContent='이미 신청하셨습니다. 강의 일정이 정해지면 회원 이메일로 안내드리겠습니다.';return;}
  $('class-form').hidden=false;
  $('class-form').addEventListener('submit',async event=>{
    event.preventDefault();$('class-submit').disabled=true;$('class-status').className='';$('class-status').textContent='신청을 접수하는 중입니다.';
    try{
      const result=await client.from('capcut_class_requests').insert({user_id:user.id,note:$('class-note').value.trim()});
      if(result.error&&result.error.code!=='23505')throw new Error('apply failed');
      $('class-form').hidden=true;$('class-status').textContent='신청이 접수되었습니다. 강의 일정은 회원 이메일로 안내드리겠습니다.';
    }catch{$('class-status').className='error';$('class-status').textContent='신청을 접수하지 못했습니다. 다시 시도해 주세요.';$('class-submit').disabled=false;}
  });
  client.auth.onAuthStateChange(event=>{if(event==='SIGNED_OUT')location.reload();});
})().catch(()=>{document.getElementById('class-gate').textContent='회원 정보를 확인하지 못했습니다. 새로고침해 주세요.';});
