(function () {
  'use strict';
  const d = window.PORTFOLIO || {};
  const byId = id => document.getElementById(id);
  const node = (tag, className, value) => { const n=document.createElement(tag); if(className)n.className=className; if(value!==undefined)n.textContent=value; return n; };
  const safeUrl = raw => {
    if(typeof raw!=='string' || !raw.trim()) return '';
    const value=raw.trim();
    if(/^\.\/assets\/[a-z0-9_./-]+$/i.test(value) && !value.includes('..')) return value;
    try {const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:'';} catch{return '';}
  };
  function link(text,raw,cls){const href=safeUrl(raw);if(!href)return null;const a=node('a',cls,text);a.href=href;if(/^https?:/.test(href)){a.target='_blank';a.rel='noopener noreferrer';}return a;}
  const displayName=typeof d.name==='string'&&d.name.trim()?d.name.trim():'Your Name';
  document.title=`${displayName} — Portfolio`;
  byId('heroName').replaceChildren(document.createTextNode(displayName),node('span','green','.'));
  byId('tagline').textContent=d.tagline||'A space to introduce myself and the things I create.';
  byId('introduction').textContent=d.introduction||'';
  byId('aboutText').textContent=d.about||'Your story goes here. This space is yours to write.';
  byId('copyright').textContent=`© ${new Date().getFullYear()} ${displayName.toUpperCase()}`;
  const portrait=safeUrl(d.portrait);
  if(portrait){const img=node('img','portrait-photo');img.src=portrait;img.alt=`Portrait of ${displayName}`;img.loading='lazy';byId('portraitBox').append(img);byId('portraitBox').classList.add('has-photo');}

  const skills=byId('skillsList');
  if(Array.isArray(d.skills))d.skills.forEach(group=>{
    if(!group||!group.group||!Array.isArray(group.items)||!group.items.length)return;
    const card=node('article','skill-card reveal');card.append(node('div','skill-group-name',group.group));
    const items=node('div','skill-items');group.items.forEach(item=>{if(typeof item==='string'&&item.trim())items.append(node('span','skill-chip',item));});card.append(items);skills.append(card);
  });
  if(!skills.children.length){const e=node('div','empty-card reveal');e.append(node('span','empty-symbol','[ + ]'),node('p','','Skills will appear here once you add them.'),node('span','empty-label','AWAITING CONTENT / SKILLS'));skills.append(e);}

  const projects=byId('projectList');
  if(Array.isArray(d.projects))d.projects.forEach((project,index)=>{
    if(!project||!project.title)return;
    const card=node('article','project-card reveal'),visual=node('div','project-visual');
    const imgSrc=safeUrl(project.image);
    if(imgSrc){const img=node('img');img.src=imgSrc;img.alt='';img.loading='lazy';visual.append(img);}else visual.append(node('span','',`PROJECT ${String(index+1).padStart(2,'0')}`));
    const body=node('div','project-body');body.append(node('span','project-topic',project.topic||'PROJECT'),node('h3','',project.title));
    if(project.description)body.append(node('p','',project.description));
    const links=node('div','project-links');const pdf=link('VIEW PDF ↗',project.pdf,'project-link'),external=link('OPEN PROJECT ↗',project.link,'project-link');if(pdf)links.append(pdf);if(external)links.append(external);if(links.children.length)body.append(links);
    card.append(visual,body);projects.append(card);
  });
  if(!projects.children.length){const e=node('div','empty-card reveal');e.append(node('span','empty-symbol','{ 00 }'),node('p','','Your project cards will appear here.'),node('span','empty-label','AWAITING CONTENT / PROJECTS'));projects.append(e);}

  const contacts=byId('contactLinks'),links=d.links||{};
  const email=typeof links.email==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(links.email)?`mailto:${links.email}`:'';
  [['EMAIL',email],['GITHUB',links.github],['LINKEDIN',links.linkedin],['RESUME / CV',links.resume]].forEach(([label,raw])=>{
    let href=label==='EMAIL'?raw:safeUrl(raw);if(!href)return;
    const a=node('a','contact-link');a.href=href;a.append(node('span','',label),node('span','','↗'));if(/^https?:/.test(href)){a.target='_blank';a.rel='noopener noreferrer';}contacts.append(a);
  });
  if(!contacts.children.length)contacts.append(node('div','contact-placeholder','// CONTACT LINKS WILL APPEAR HERE'));

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduce){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});reveal.forEach(n=>observer.observe(n));}else reveal.forEach(n=>n.classList.add('visible'));

  // Lightweight Matrix columns; automatically respect reduced-motion settings.
  const canvas=byId('matrixRain'),ctx=canvas.getContext('2d');
  let cols=[],width=0,height=0,raf=0,playing=!reduce,last=0;
  const alphabet='01アイウエオカキクケコサシスセソ<>[]{}';
  function resize(){const rect=canvas.getBoundingClientRect();const ratio=Math.min(window.devicePixelRatio||1,2);width=rect.width;height=rect.height;canvas.width=Math.max(1,Math.floor(width*ratio));canvas.height=Math.max(1,Math.floor(height*ratio));ctx.setTransform(ratio,0,0,ratio,0,0);cols=Array.from({length:Math.ceil(width/25)},()=>-Math.random()*height/25);}
  function frame(time){if(!playing)return;raf=requestAnimationFrame(frame);if(time-last<55)return;last=time;ctx.fillStyle='rgba(4,13,7,.12)';ctx.fillRect(0,0,width,height);ctx.font='13px monospace';for(let i=0;i<cols.length;i++){const x=i*25,y=cols[i]*25;ctx.fillStyle=Math.random()>.94?'rgba(192,255,205,.76)':'rgba(54,167,78,.29)';ctx.fillText(alphabet[Math.floor(Math.random()*alphabet.length)],x,y);if(y>height&&Math.random()>.983)cols[i]=0;else cols[i]+=.34+((i%5)/28);}}
  resize();window.addEventListener('resize',resize,{passive:true});
  const toggle=byId('motionToggle');
  function setPlaying(on){playing=on;toggle.setAttribute('aria-pressed',String(on));toggle.setAttribute('aria-label',on?'Pause background animation':'Resume background animation');toggle.querySelector('.motion-label').textContent=on?'MOTION ON':'MOTION OFF';cancelAnimationFrame(raf);if(on){last=0;raf=requestAnimationFrame(frame);}else ctx.clearRect(0,0,width,height);}
  toggle.addEventListener('click',()=>setPlaying(!playing));setPlaying(playing);
  const art=byId('portraitBox');let pointerTick=0;
  art.addEventListener('pointermove',event=>{if(!playing)return;cancelAnimationFrame(pointerTick);pointerTick=requestAnimationFrame(()=>{const r=art.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;art.style.setProperty('--grid-x',`${x*22}px`);art.style.setProperty('--grid-y',`${y*22}px`);});});
  art.addEventListener('pointerleave',()=>{art.style.setProperty('--grid-x','0px');art.style.setProperty('--grid-y','0px');});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else if(playing)raf=requestAnimationFrame(frame);});
})();
