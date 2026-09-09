const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
const dialog=document.querySelector('#preview-dialog');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');dialog.showModal()}));
document.querySelectorAll('.close,.close-dialog').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});

document.querySelectorAll('a[href="#sobre"], a[href="#lazer"], a[href="#video-conceito"]').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));

const track=document.querySelector('.gallery-track');
const cards=[...track.querySelectorAll('.gallery-card')];
const previous=document.querySelector('.gallery-arrow.previous');
const next=document.querySelector('.gallery-arrow.next');
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
function galleryStep(direction){const gap=parseFloat(getComputedStyle(track).gap)||0;track.scrollBy({left:direction*(cards[0].getBoundingClientRect().width+gap),behavior:motion.matches?'instant':'smooth'});}
previous.addEventListener('click',()=>galleryStep(-1));next.addEventListener('click',()=>galleryStep(1));
track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();galleryStep(event.key==='ArrowRight'?1:-1);}});
function updateGallery(){previous.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2;}
track.addEventListener('scroll',updateGallery,{passive:true});window.addEventListener('resize',updateGallery);
requestAnimationFrame(()=>{const gap=parseFloat(getComputedStyle(track).gap)||0;track.scrollLeft=cards[0].getBoundingClientRect().width+gap;updateGallery();});
