const TOTAL_PAGES = 73;
const chapters = [
  {group:'Ⅰ 공통', items:[['TSGR',6],['작업중지/재개 기준',7],['사업장 공실 관리',8],['근로자 작업중지권',9],['사업장 출입 기준',10],['안전보건교육',11]]},
  {group:'Ⅱ 안전서류', items:[['TBM 안전일지',13],['주간 위험성평가',14],['작업계획서',15]]},
  {group:'Ⅲ 작업기준', items:[['안전보호구',18],['환경/폐기물',20],['화학물질/MSDS',21],['지게차',25],['고소작업대',27],['화물자동차',29],['크레인',31],['줄걸이용구',33],['공도구/승하강설비',34],['고소',36],['화기',38],['용접/용단',40],['전기',43],['LOTO 운영 관리',45],['산업용 로봇',46],['열매체유',47],['활 배터리',48],['목시/SVM',49],['PJT 작업구역',51]]},
  {group:'Ⅳ 부록', items:[['SHE 전산화 시스템',54],['SVM 목록표',67]]}
];
let page = 1;
const $ = s => document.querySelector(s);
const toc = $('#toc');
function pad(n){return String(n).padStart(2,'0')}
function showPage(n){page=Math.max(1,Math.min(TOTAL_PAGES,n));$('#homeView').hidden=true;$('#readerView').hidden=false;$('#pageImage').src=`public/pages/page-${pad(page)}.png`;$('#pageImage').alt=`PDF page ${page}`;$('#pageLabel').textContent=`${page} / ${TOTAL_PAGES}`;$('#screenTitle').textContent='자료 보기';$('#screenSub').textContent=`원본 PDF ${page}페이지`;document.body.classList.remove('drawerOpen');window.scrollTo({top:0,behavior:'smooth'});}
function buildToc(filter=''){
  toc.innerHTML='';
  const q=filter.trim().toLowerCase();
  chapters.forEach(ch=>{
    const items=ch.items.filter(([t])=>!q||t.toLowerCase().includes(q));
    if(!items.length) return;
    const group=document.createElement('div'); group.className='tocGroup';
    group.innerHTML=`<h3>${ch.group}</h3>`;
    items.forEach(([title,p])=>{
      const b=document.createElement('button'); b.className='tocItem';
      b.innerHTML=`<span>${title}</span><small>p.${p}</small>`;
      b.onclick=()=>showPage(p);
      group.appendChild(b);
    });
    toc.appendChild(group);
  });
}
function buildQuick(){
  const quick=[['📘 공통','TSGR / 작업중지 / 출입 기준',6],['📋 안전서류','TBM / 위험성평가 / 작업계획서',13],['⚠ 작업기준','장비·화기·전기·고소작업',18],['🚜 장비안전','지게차 / 고소작업대 / 크레인',25],['🔥 화기·전기','화기 / 용접 / 전기 / LOTO',38],['📎 부록','SHE 전산화 시스템 / SVM',54]];
  $('#quickGrid').innerHTML=quick.map(([a,b])=>`<div class="quickCard"><b>${a}</b><span>${b}</span></div>`).join('');
  document.querySelectorAll('.quickCard').forEach((el,i)=>el.onclick=()=>showPage(quick[i][2]));
}
buildToc(); buildQuick();
$('#startBtn').onclick=()=>showPage(1);
$('#prevBtn').onclick=()=>showPage(page-1);
$('#nextBtn').onclick=()=>showPage(page+1);
$('#menuBtn').onclick=()=>document.body.classList.add('drawerOpen');
$('#drawerBackdrop').onclick=()=>document.body.classList.remove('drawerOpen');
$('#searchInput').oninput=e=>buildToc(e.target.value);
window.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')showPage(page-1); if(e.key==='ArrowRight')showPage(page+1);});
let deferredPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault(); deferredPrompt=e; $('#installBtn').hidden=false;});
$('#installBtn').onclick=async()=>{if(!deferredPrompt)return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; $('#installBtn').hidden=true;};
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js'));}
