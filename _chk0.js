
document.body.classList.add('no-scroll');
function enterApp(){
  document.body.classList.remove('no-scroll');
  var l=document.getElementById('landing');
  l.classList.add('landing-hide');
  setTimeout(function(){ l.style.display='none'; },900);
}
(function(){
  // fireflies
  var wrap=document.getElementById('fireflies');
  for(var i=0;i<18;i++){
    var s=document.createElement('span');
    s.style.left=(Math.random()*100)+'%';
    s.style.top=(30+Math.random()*55)+'%';
    s.style.animationDelay=(Math.random()*6)+'s';
    s.style.animationDuration=(5+Math.random()*4)+'s';
    wrap.appendChild(s);
  }
  // wildflowers
  var flora=document.getElementById('flora');
  var cols=['#E8C64A','#C77DBA','#E98FA6','#9DD97B','#F0EFE4'];
  for(var j=0;j<44;j++){
    var f=document.createElement('span');
    var c=cols[Math.floor(Math.random()*cols.length)];
    var sz=(3+Math.random()*4);
    f.style.width=sz+'px';f.style.height=sz+'px';
    f.style.left=(Math.random()*100)+'%';
    f.style.bottom=(Math.random()*9)+'vh';
    f.style.background=c;
    f.style.boxShadow='0 0 '+(4+Math.random()*6)+'px '+c;
    f.style.opacity=(0.25+Math.random()*0.5);
    f.style.animationDelay=(Math.random()*4)+'s';
    f.style.animationDuration=(4+Math.random()*5)+'s';
    flora.appendChild(f);
  }
  // parallax — hills drift with the pointer
  document.getElementById('landing').addEventListener('pointermove',function(e){
    var cx=(e.clientX/window.innerWidth-0.5), cy=(e.clientY/window.innerHeight-0.5);
    document.querySelectorAll('.hills').forEach(function(h){
      var d=parseFloat(h.getAttribute('data-depth'))||8;
      h.style.transform='translate('+(cx*d*-1)+'px,'+(cy*d*-0.4)+'px)';
    });
  });
  // timeline math — plan runs Jun 1 2026 → May 31 2027
  var start=new Date('2026-06-01T00:00:00'), end=new Date('2027-05-31T23:59:59'), now=new Date();
  var total=end-start, done=Math.min(Math.max(now-start,0),total);
  var pct=done/total*100;
  var daysLeft=Math.max(0,Math.ceil((end-now)/86400000));
  var monthIdx=Math.min(12,Math.max(1,(now.getFullYear()-2026)*12+(now.getMonth()-5)+1));
  document.getElementById('lp-days').textContent=daysLeft+' days';
  document.getElementById('lp-month-label').textContent='Month '+monthIdx+' of 12';
  var fillPct=Math.max(2,Math.min(98,pct));
  setTimeout(function(){
    document.getElementById('lp-fill').style.width=fillPct+'%';
    document.getElementById('lp-dot').style.left=fillPct+'%';
  },350);
  // count-up — today's pool → 12-month horizon (reads saved values when available)
  var pool=7100, target=35500;
  try{
    var p=parseFloat(localStorage.getItem('njcap:field:nicole_capital'))||0;
    var j2=parseFloat(localStorage.getItem('njcap:field:jason_capital'))||0;
    var t=parseFloat(localStorage.getItem('njcap:field:target_usdt'))||0;
    if(p+j2>0)pool=p+j2;
    if(t>0)target=t;
  }catch(e){}
  function countUp(el,to,ms){
    var t0=null;
    function step(ts){
      if(!t0)t0=ts;
      var k=Math.min(1,(ts-t0)/ms), eased=1-Math.pow(1-k,3);
      el.textContent='$'+Math.round(to*eased).toLocaleString();
      if(k<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  countUp(document.getElementById('lp-now'),pool,1400);
  countUp(document.getElementById('lp-target'),target,2200);
})();
