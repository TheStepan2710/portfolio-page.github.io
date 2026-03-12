(() => {
  const content = window.PORTFOLIO_CONTENT;
  const availableLangs = ['ru', 'en'];

  const getInitialLanguage = () => {
    const stored = localStorage.getItem('portfolio-lang');
    if (stored && availableLangs.includes(stored)) return stored;
    const browserLang = (navigator.language || 'en').toLowerCase();
    return browserLang.startsWith('ru') ? 'ru' : 'en';
  };

  const state = {
    lang: getInitialLanguage()
  };

  const refs = {
    body: document.body,
    header: document.querySelector('.site-header'),
    navPanel: document.getElementById('nav-panel'),
    menuToggle: document.querySelector('.menu-toggle'),
    navList: document.getElementById('nav-list'),
    langSwitch: document.getElementById('lang-switch'),
    logo: document.querySelector('.logo'),
    telegramLink: document.getElementById('telegram-link'),
    linkedinLink: document.getElementById('linkedin-link'),
    resumeLink: document.getElementById('resume-link'),
    heroEyebrow: document.getElementById('hero-eyebrow'),
    heroTitle: document.getElementById('hero-title'),
    heroText: document.getElementById('hero-text'),
    heroPrimaryCta: document.getElementById('hero-primary-cta'),
    heroSecondaryCta: document.getElementById('hero-secondary-cta'),
    heroStatus: document.getElementById('hero-status'),
    quickProofTitle: document.getElementById('quick-proof-title'),
    quickProofItems: document.getElementById('quick-proof-items'),
    workTitle: document.getElementById('work-title'),
    workIntro: document.getElementById('work-intro'),
    workCards: document.getElementById('work-cards'),
    experienceTitle: document.getElementById('experience-title'),
    experienceIntro: document.getElementById('experience-intro'),
    experienceItems: document.getElementById('experience-items'),
    petTitle: document.getElementById('pet-title'),
    petIntro: document.getElementById('pet-intro'),
    petCards: document.getElementById('pet-cards'),
    aboutTitle: document.getElementById('about-title'),
    aboutText: document.getElementById('about-text'),
    contactTitle: document.getElementById('contact-title'),
    contactText: document.getElementById('contact-text'),
    contactTelegram: document.getElementById('contact-telegram'),
    contactLinkedin: document.getElementById('contact-linkedin'),
    contactResume: document.getElementById('contact-resume')
  };

  const createTagList = (tags) => {
    const list = document.createElement('div');
    list.className = 'tag-list';
    tags.forEach((tag) => {
      const item = document.createElement('span');
      item.className = 'tag';
      item.textContent = tag;
      list.append(item);
    });
    return list;
  };

  const createCaseCard = (project, links) => {
    const card = document.createElement('article');
    card.className = `project-card ${project.type === 'nda' ? 'nda' : ''}`;

    const imageWrap = document.createElement('div');
    imageWrap.className = 'project-image';
    if (project.type === 'nda') {
      imageWrap.dataset.note = project.hoverNote;
      const ndaLabel = document.createElement('span');
      ndaLabel.className = 'nda-label';
      ndaLabel.textContent = project.overlayLabel;
      imageWrap.append(ndaLabel);
    }

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.title;
    image.loading = 'lazy';
    imageWrap.append(image);

    const body = document.createElement('div');
    body.className = 'project-body';
    body.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
    body.append(createTagList(project.tags));

    const cta = document.createElement('a');
    cta.href = project.type === 'nda' ? links.telegram : '#contact';
    cta.target = project.type === 'nda' ? '_blank' : '_self';
    cta.rel = 'noreferrer';
    cta.className = 'card-cta';
    cta.textContent = project.cta;
    body.append(cta);

    card.append(imageWrap, body);
    return card;
  };

  const createPetCard = (project) => {
    const card = document.createElement('article');
    card.className = 'pet-card';
    card.innerHTML = `
      <div class="pet-image"><img src="${project.image}" alt="${project.title}" loading="lazy"></div>
      <div class="pet-body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;
    const body = card.querySelector('.pet-body');
    body.append(createTagList(project.tags));

    const cta = document.createElement('a');
    cta.href = '#contact';
    cta.className = 'card-cta';
    cta.textContent = project.cta;
    body.append(cta);
    return card;
  };

  const render = () => {
    const t = content[state.lang];
    const links = content.contacts;

    document.documentElement.lang = state.lang;

    refs.logo.textContent = t.siteName;
    refs.navList.innerHTML = '';
    t.nav.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${item.href}">${item.label}</a>`;
      refs.navList.append(li);
    });

    refs.menuToggle.textContent = t.headerButtons.menu;
    refs.telegramLink.textContent = t.headerButtons.telegram;
    refs.linkedinLink.textContent = t.headerButtons.linkedin;
    refs.resumeLink.textContent = t.headerButtons.resume;

    [refs.telegramLink, refs.contactTelegram].forEach((el) => (el.href = links.telegram));
    [refs.linkedinLink, refs.contactLinkedin].forEach((el) => (el.href = links.linkedin));
    [refs.resumeLink, refs.heroSecondaryCta, refs.contactResume].forEach((el) => (el.href = links.resume));

    refs.heroEyebrow.textContent = t.hero.eyebrow;
    refs.heroTitle.textContent = t.hero.title;
    refs.heroText.textContent = t.hero.text;
    refs.heroPrimaryCta.textContent = t.hero.primaryCta;
    refs.heroSecondaryCta.textContent = t.hero.secondaryCta;
    refs.heroStatus.textContent = t.hero.status;

    refs.quickProofTitle.textContent = t.quickProof.title;
    refs.quickProofItems.innerHTML = '';
    t.quickProof.items.forEach((item) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = item;
      refs.quickProofItems.append(chip);
    });

    refs.workTitle.textContent = t.selectedWork.title;
    refs.workIntro.textContent = t.selectedWork.intro;
    refs.workCards.innerHTML = '';
    t.workCases.forEach((project) => refs.workCards.append(createCaseCard(project, links)));

    refs.experienceTitle.textContent = t.experience.title;
    refs.experienceIntro.textContent = t.experience.intro;
    refs.experienceItems.innerHTML = '';
    t.experience.items.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'experience-item';
      article.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
      refs.experienceItems.append(article);
    });

    refs.petTitle.textContent = t.petProjects.title;
    refs.petIntro.textContent = t.petProjects.intro;
    refs.petCards.innerHTML = '';
    t.petProjects.cards.forEach((project) => refs.petCards.append(createPetCard(project)));

    refs.aboutTitle.textContent = t.about.title;
    refs.aboutText.textContent = t.about.text;

    refs.contactTitle.textContent = t.finalCta.title;
    refs.contactText.textContent = t.finalCta.text;
    refs.contactTelegram.textContent = t.finalCta.buttons.telegram;
    refs.contactLinkedin.textContent = t.finalCta.buttons.linkedin;
    refs.contactResume.textContent = t.finalCta.buttons.resume;

    refs.langSwitch.querySelectorAll('[data-lang]').forEach((el) => {
      el.classList.toggle('active', el.dataset.lang === state.lang);
    });
  };

  refs.langSwitch.addEventListener('click', () => {
    state.lang = state.lang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('portfolio-lang', state.lang);
    render();
  });

  refs.menuToggle.addEventListener('click', () => {
    const isOpen = refs.navPanel.classList.toggle('open');
    refs.menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth > 920) return;
    const inside = event.target.closest('.site-header');
    if (!inside) {
      refs.navPanel.classList.remove('open');
      refs.menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('scroll', () => {
    refs.header.classList.toggle('is-compact', window.scrollY > 20);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

  document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.04;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.04;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });

  render();
})();
