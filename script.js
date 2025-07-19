class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
    this.queue = [];
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      this.queue.push({
        from: oldText[i] || '',
        to: newText[i] || '',
        start: Math.floor(Math.random() * 40),
        end: Math.floor(Math.random() * 40) + 40
      });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
  }

  update() {
    let output = '';
    let complete = 0;
    for (const q of this.queue) {
      if (this.frame >= q.end) {
        complete++;
        output += q.to;
      } else if (this.frame >= q.start) {
        if (!q.char || Math.random() < 0.28) {
          q.char = this.chars[Math.floor(Math.random() * this.chars.length)];
        }
        output += `<span class="dud">${q.char}</span>`;
      } else {
        output += q.from;
      }
    }
    this.el.innerHTML = output;
    if (complete < this.queue.length) {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

function scrambleHeader(title, subtitle) {
  const headerEl = document.getElementById('headerTitle');
  const subEl = document.getElementById('subtitle');
  const fxH = new TextScramble(headerEl);
  const fxS = new TextScramble(subEl);
  headerEl.innerText = '';
  subEl.innerText = '';
  title.split('').forEach((ch, i) => {
    fxH.queue.push({ from: '', to: ch, start: i * 7, end: i * 7 + 40 });
  });
  subtitle.split('').forEach((ch, i) => {
    fxS.queue.push({ from: '', to: ch, start: i * 7, end: i * 7 + 20 });
  });
  fxH.frame = 0; fxH.update();
  fxS.frame = 0; fxS.update();
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.body.id === 'index') {
    scrambleHeader('DAS KONZEPT', 'Gedanken und eindrücke des Michel Linses');

    const interactive = document.getElementById('interactive');
    const socials = [
      { name: 'Instagram', url: 'https://instagram.com/DEIN_USERNAME', art: `<pre> .--.\n/ o  o \n|  <>  |\n \\----/\n</pre>` },
      { name: 'Pinterest', url: 'https://pinterest.com/DEIN_USERNAME', art: `<pre> .--.\n| P  |\n| \\  |\n '--'</pre>` },
      { name: 'TikTok', url: 'https://tiktok.com/@DEIN_USERNAME', art: `<pre> _||_\n|/\\_|\n \\/</pre>` }
    ];
    const fonts = [
      "'California Signature',cursive",
      "'Medieval Sharp',cursive",
      "'Straight Neckline',cursive"
    ];
    interactive.addEventListener('click', () => {
      const p = socials[Math.floor(Math.random() * socials.length)];
      interactive.innerHTML = `<a href="${p.url}" target="_blank">${p.art}<small>${p.name}</small></a>`;
      document.body.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
    });
  } else if (document.body.id === 'tools') {
    scrambleHeader('FUNDSACHEN', 'Hier gibt’s Extras und Spielereien');
  }

  document.querySelector('.arrow-link')?.addEventListener('click', e => {
    e.preventDefault();
    const nav = document.querySelector('.main-nav ul');
    let sc = 0;
    const iv = setInterval(() => {
      nav.scrollLeft += 4;
      if ((sc += 4) >= 200) clearInterval(iv);
    }, 20);
  });

  document.querySelectorAll('.main-nav a').forEach(a => {
    a.style.fontSize = `${(Math.random() * 0.5 + 1).toFixed(2)}rem`;
  });
});
