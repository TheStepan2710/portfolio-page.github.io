# Портфолио Product Designer — Stepan Tribunskii

## 1) Что это за проект
Статический, двуязычный (RU/EN), адаптивный сайт-портфолио для Product Designer с акцентом на найм:
- крупный hero-блок;
- визуально доминирующий раздел **Selected Work**;
- отдельная NDA-карточка с блюром;
- компактные блоки опыта, pet-проектов, about и финального CTA.

Проект собран на **HTML + CSS + JavaScript**, без тяжёлых фреймворков, чтобы его было легко редактировать вручную и деплоить на GitHub Pages.

---

## 2) Как запустить локально
> Рекомендуется запускать через локальный сервер (а не `file://`), чтобы корректно работали все относительные пути.

### Вариант A (Python)
```bash
python3 -m http.server 8000
```
Откройте: `http://localhost:8000`

### Вариант B (VS Code Live Server)
1. Откройте проект в VS Code.
2. Нажмите `Go Live`.
3. Откройте URL из Live Server.

---

## 3) Структура проекта
```text
.
├─ index.html
├─ styles.css
├─ js/
│  └─ main.js
├─ data/
│  └─ content.js
├─ assets/
│  ├─ images/
│  │  └─ placeholders/
│  │     ├─ hero-placeholder.svg
│  │     ├─ beton-web-placeholder.svg
│  │     ├─ nioktr-placeholder.svg
│  │     ├─ nda-fintech-placeholder.svg
│  │     └─ beton-mobile-placeholder.svg
│  └─ resume/
│     └─ stepan-tribunskii-resume.pdf
└─ README.md
```

---

## 4) Где лежат тексты RU/EN
Все тексты вынесены в один файл:
- `data/content.js`

Там есть два корневых языка:
- `ru` — русский
- `en` — английский

Меняйте тексты только там, не в `index.html`.

---

## 5) Как менять Telegram / LinkedIn / Resume ссылки
Откройте `data/content.js`, блок:
```js
contacts: {
  telegram: '#',
  linkedin: '#',
  resume: 'assets/resume/stepan-tribunskii-resume.pdf'
}
```

Замените `#` на реальные URL.

---

## 6) Как заменить PDF-резюме
1. Положите новый PDF в `assets/resume/`.
2. Обновите путь в `data/content.js -> contacts.resume`.

Пример:
```js
resume: 'assets/resume/stepan-tribunskii-resume-v2.pdf'
```

---

## 7) Как заменить изображения-заглушки
Для кейсов и hero меняются пути в `data/content.js` у поля `image`.

Рекомендуется хранить новые изображения в:
- `assets/images/` (можно создать подпапки `work/`, `pet/` и т.д.)

Пример:
```js
image: 'assets/images/work/my-case-cover.jpg'
```

---

## 8) Как добавить новый кейс (public)
Кейсы лежат в массиве:
- `ru.workCases`
- `en.workCases`

### Шаги
1. Добавьте объект в `ru.workCases` с `type: 'public'`.
2. Добавьте соответствующий объект в `en.workCases`.
3. Проверьте, что у обоих одинаковая логика структуры и корректный путь к картинке.

### Пример (RU)
```js
{
  type: 'public',
  title: 'Новый кейс',
  description: 'Короткое описание задачи, роли и результата.',
  tags: ['Web', 'UX/UI'],
  cta: 'Открыть кейс',
  image: 'assets/images/placeholders/new-case.svg'
}
```

---

## 9) Как добавить новый NDA-кейс
NDA-кейс — это такой же объект в `workCases`, но с `type: 'nda'` и двумя доп.полями:
- `overlayLabel`
- `hoverNote`

### Шаги
1. Добавьте объект в `ru.workCases` и `en.workCases`.
2. Укажите `type: 'nda'`.
3. Заполните `overlayLabel` и `hoverNote` для каждой локали.

### Пример
```js
{
  type: 'nda',
  title: 'Confidential Product',
  description: 'Описание NDA-кейса без раскрытия деталей.',
  tags: ['NDA', 'Mobile'],
  cta: 'Обсудить кейс',
  image: 'assets/images/placeholders/nda-new.svg',
  overlayLabel: 'NDA',
  hoverNote: 'Могу рассказать подробнее лично'
}
```

---

## 10) Как добавить новый Pet-проект
Pet-проекты лежат в:
- `ru.petProjects.cards`
- `en.petProjects.cards`

### Шаги
1. Добавьте новый объект карточки в RU и EN массивы.
2. Проверьте `title`, `description`, `tags`, `cta`, `image`.

---

## 11) Как менять теги
Теги — это массив строк `tags` внутри карточки проекта.

Пример:
```js
tags: ['Web', 'Lead on project', 'Metrics']
```

Добавляйте, удаляйте или меняйте порядок вручную.

---

## 12) Как работает переключение RU / EN
Логика в `js/main.js`:
1. При первом входе читается язык браузера.
2. Если браузер `ru-*` -> язык по умолчанию RU, иначе EN.
3. Выбор пользователя сохраняется в `localStorage` (`portfolio-lang`).
4. После перезагрузки остаётся выбранный язык.

---

## 13) Как менять навигацию
Навигационные пункты задаются в:
- `ru.nav`
- `en.nav`

Каждый элемент:
```js
{ label: 'Проекты', href: '#work' }
```

Если добавляете новый пункт, убедитесь, что на странице есть секция с таким `id`.

---

## 14) Как менять стили, цвета, отступы и шрифты
Все стили находятся в `styles.css`.

Основные токены в `:root`:
- `--bg`, `--surface`, `--text`, `--muted`
- `--line`, `--accent`
- `--radius-*`, `--container`

Что менять чаще всего:
- Размеры отступов секций: `section { padding: ... }`
- Ширина контейнера: `--container`
- Радиусы карточек: `--radius-lg`, `--radius-md`
- Цвета кнопок: `.btn-solid`, `.btn-ghost`

---

## 15) Как работает адаптивность
Ключевые брейкпоинты:
- `1100px`
- `920px`
- `640px`
- отдельные правила для ландшафта с малой высотой (`max-height: 460px`)

Особенности:
- на мобильных появляется burger menu;
- карточки становятся в один столбец;
- хедер остаётся sticky и в компактном состоянии при скролле;
- кнопки сохраняют удобный tap-size.

---

## 16) Как выложить сайт на GitHub Pages
1. Запушьте репозиторий в GitHub.
2. Откройте `Settings -> Pages`.
3. В `Build and deployment` выберите:
   - `Source: Deploy from a branch`
   - Branch: `main` (или текущая ветка), папка `/root`
4. Сохраните настройки.
5. Дождитесь публикации и проверьте URL из GitHub Pages.

---

## 17) Какие файлы нельзя удалять
Критичные файлы:
- `index.html`
- `styles.css`
- `js/main.js`
- `data/content.js`

Также не удаляйте изображения/резюме, на которые есть ссылки в `content.js`.

---

## 18) Частые ошибки при ручной правке
1. Удалили поле в объекте карточки (`title`, `description`, `tags`, `cta`, `image`).
2. Указали неверный путь к изображению или PDF.
3. Изменили `href` в навигации, но забыли создать соответствующий `id` секции.
4. Добавили кейс только в RU или только в EN.
5. Сломали синтаксис JS (пропущена запятая/скобка в `content.js`).

---

## Пошаговые практические примеры

### A) Добавление нового public case
1. Загрузите обложку в `assets/images/work/new-public.jpg`.
2. В `ru.workCases` добавьте объект `type: 'public'`.
3. В `en.workCases` добавьте эквивалент на английском.
4. Перезапустите локальный сервер и проверьте карточку.

### B) Добавление нового NDA case
1. Загрузите абстрактную обложку в `assets/images/work/new-nda.jpg`.
2. Добавьте объект с `type: 'nda'`, `overlayLabel`, `hoverNote` в RU и EN.
3. Убедитесь, что карточка отображается с блюром и не раскрывается полностью.

### C) Добавление нового Pet project
1. Добавьте обложку в `assets/images/pet/new-pet.jpg`.
2. Добавьте карточку в `ru.petProjects.cards` и `en.petProjects.cards`.
3. Проверьте адаптив: desktop + mobile.

---

Если после ручной правки что-то не отображается, в первую очередь проверяйте `data/content.js` на корректность структуры и синтаксиса.
