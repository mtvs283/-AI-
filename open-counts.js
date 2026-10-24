window.OnmaeumOpenCounts=function(client){
  const label=(kind,key)=>`<span data-open-count data-open-kind="${kind}" data-open-key="${key}">—</span>`;
  function update(kind,key,value){document.querySelectorAll('[data-open-count]').forEach(node=>{if(node.dataset.openKind===kind&&node.dataset.openKey===String(key)){node.textContent=Number(value).toLocaleString('ko-KR');node.setAttribute('aria-label',`조회수 ${node.textContent}`);}});}
  async function refresh(root){
    if(!client||!root)return;
    const groups=new Map();
    root.querySelectorAll('[data-open-count]').forEach(node=>{if(!groups.has(node.dataset.openKind))groups.set(node.dataset.openKind,new Set());groups.get(node.dataset.openKind).add(node.dataset.openKey);});
    await Promise.all([...groups].map(async([kind,keys])=>{try{const {data,error}=await client.rpc('onmaeum_open_counts',{p_kind:kind,p_keys:[...keys]});if(!error)for(const row of data||[])update(kind,row.item_key,row.view_count);}catch{}}));
  }
  async function record(kind,key){
    if(!client||!key)return;
    try{const {data,error}=await client.rpc('onmaeum_record_open',{p_kind:kind,p_key:String(key)});if(!error&&data!==null)update(kind,key,data);}catch{}
  }
  function linkOpened(event){const link=event.target.closest('a[data-open-kind][data-open-key]');if(link&&!event.defaultPrevented&&(event.button===0||event.button===1))void record(link.dataset.openKind,link.dataset.openKey);}
  document.addEventListener('click',linkOpened);
  document.addEventListener('auxclick',linkOpened);
  return {label,refresh,record};
};
