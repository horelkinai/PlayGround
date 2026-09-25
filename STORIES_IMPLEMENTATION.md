# Stories / Statuses — P0 Implementation

Реализация P0-пункта из `STORIES_AUDIT.md` в существующем приложении.
Новый проект не создавался, reels / каталог / профили / route tree не
переписывались, `src/routeTree.gen.ts` вручную не редактировался.

## Что сделано

### Данные и типы

| Символ | Файл | Назначение |
| --- | --- | --- |
| `StoryMediaType`, `StoryItem`, `StoryUserStatus`, `StoryRailEntry` | `src/lib/types.ts` | типы stories и статусов |
| `STORY_SELF_ID` | `src/lib/demo-data.ts` | id текущего пользователя |
| `STORY_DEFAULT_DURATION_MS` | `src/lib/demo-data.ts` | длительность истории по умолчанию |
| `STORIES` | `src/lib/demo-data.ts` | фикстуры: single и multi stories |
| `DEMO_VIEWED_STORY_IDS` | `src/lib/demo-data.ts` | предпросмотренные истории |
| `storiesByProfile`, `storyAuthorIds`, `storyById` | `src/lib/demo-data.ts` | выборки по профилю |

Фикстура покрывает все четыре статуса: `new` (Noa, Lina), `seen` (Maya, Yael),
`empty` (Sofia — профиль без историй), `own` (собственные stories).
Медиа — только локальные `/portraits/*` и CSS-градиенты, внешних запросов нет.

### Чистая логика — `src/lib/stories.ts`

`storyUserStatus`, `isOpenable`, `storyRingClass`, `unseenStoryCount`,
`buildStoryRail`, `firstUnseenIndex`, `nextUnseenAuthor`, `storyDuration`.

Статус зависит только от stories и `viewedStoryIds`. `verified`, `vip` и
approval в логику колец не вмешиваются — намеренно, это требование P0.

### Состояние — `src/lib/store.ts`

Добавлены `viewedStoryIds`, `markStoryViewed`, `markUserStoriesViewed`,
`isStoryViewed`, `resetStoryViews`. Ключ persistence прежний — `i11-store-v3`.
Все поля нормализуются при rehydrate, поэтому payload'ы, созданные до stories
(в том числе битый JSON), открываются без ошибок.

### Компоненты — `src/components/stories.tsx`

`StoryAvatar`, `StoryRing` (внешний `ring` + внутренний `ring-inset`),
`StoryRail`, `StoryProgress`, `StoryViewer`.

Геометрия колец: tile `70px`, кольцо `66×66`, фото `58×58`, `shrink-0`,
`aspect-square`, `object-cover`, `overflow-hidden`. Измерено в браузере на
desktop и mobile.

Viewer: прогресс по сегментам, autoplay, тап вперёд/назад, Escape, Space,
удержание указателем, пауза при скрытии вкладки, блокировка прокрутки
фона, возврат фокуса. Профиль открывается отдельной ссылкой
(`data-story-profile`), аватар открывает только viewer.

### Подключение — `src/routes/_app/home.tsx`

Лента stories подключена вместо inline-полосы; feed и список авторов
сохранены. Story-данные берутся из `STORIES` через `buildStoryRail`.

### Локализация — `src/lib/i18n.ts`

Ключи stories и viewer добавлены для `ru`, `en`, `he`, `ar`.

## Найденные и исправленные баги

1. **Гонка эффектов таймера.** Timer-эффект был объявлен раньше «сброса
   часов» и стартовал от устаревшего `elapsedRef` предыдущей истории. Новый
   кадр мог перескочить через границу и сбросить прогресс. Сброс полностью
   дублировал `goTo`/`goTo`-seed, поэтому эффект удалён; зависимости таймера
   теперь `[open, paused, storyId, duration]`.
2. **Space закрывал viewer.** Фокус вставал на кнопку закрытия, и Space
   активировал её. Фокус перенесён на сам диалог (`tabIndex={-1}`).
3. **Отрицательный прогресс.** `requestAnimationFrame` может вернуть метку
   кадра раньше `performance.now()`, выбранного в том же тике — добавлен
   `Math.max(0, …)`.
4. **Призрачный горизонтальный скролл на mobile.** Абсолютный `sr-only` внутри
   плитки растягивал корневой scroll area; плитка получила `relative`.
5. **Кнопка закрытия не нажималась.** Тап-зоны «назад»/«вперёд» занимали всю
   высоту (`inset-y-0`) с `z-20`, а шапка с крестиком была на `z-10`. Правая
   зона перекрывала крестик и перехватывала клик — просмотрщик листался вместо
   закрытия. Шапка и подпись подняты до `z-30` и сделаны
   `pointer-events-none` (события включены только на самой кнопке), чтобы
   прозрачные области не блокировали тап по сцене.
6. **Тёмный вход.** Экран входа затемнялся `via-black/70`, а логотип был
   `h-12` и прижат к низу. Фото переведено на `object-center`, затемнение
   ослаблено, логотип увеличен до `420×112` на desktop и `300×80` на mobile и
   вынесен в центр композиции. Логика гейта, копирайт, кнопки и ссылки
   сохранены.

## Проверки

| Команда | Результат |
| --- | --- |
| `npm run typecheck` | проходит |
| `npx eslint <изменённые файлы>` | 0 ошибок, 0 предупреждений |
| `npm run lint` (весь репозиторий) | 156 ошибок / 112 предупреждений — базовый уровень репозитория, новых нет |
| `npm test` | 196 тестов, 188 проходят, 8 падений |
| `npm run build` | успешно |
| `npm run check:stories` (dev, 8080) | 58/58 |
| `STORIES_BASE_URL=…:8081 node scripts/stories-browser-check.mjs` (прод-билд) | 58/58 |
| `node scripts/browser-smoke.mjs` (desktop + mobile) | без ошибок консоли, без горизонтального скролла |

8 падений `npm test` — в `scripts/grok-pwa-plugin.test.mjs` (og-теги и share-card
платформенного слоя). Файл не менялся, упоминаний stories не содержит, падает
независимо от этой работы.

Проверено в браузере на обеих ширинах: геометрия `66×66` / `58×58`; статусы
`new/seen/empty/own`; тап по аватару открывает dialog, а не профиль;
`role="dialog"` + `aria-modal`; отметка просмотра; autoplay; Escape; Space;
удержание указателем; возврат фокуса; сохранение `viewedStoryIds` после
перезагрузки; пустой профиль не открывается; переход по отдельной ссылке в
профиль; **реальный клик по крестику закрывает viewer** (и до, и после
листания); сцена остаётся тапабельной под шапкой и подписью; rail —
собственный скроллер; отсутствие горизонтального overflow.

Также проверена устойчивость rehydrate: payload без `viewedStoryIds`, с
`viewedStoryIds` неверного типа, с мусором внутри и полностью битый JSON —
во всех случаях приложение открывается без ошибок.

## Скриншоты

- `screenshots/audit-desktop-*.png`, `screenshots/audit-mobile-*.png` — исходный аудит.
- `screenshots/audit-raw.json` — сырые данные аудита.
- `screenshots/stories-{desktop,mobile}-{1-rail,2-viewer,3-after}.png` — P0.
- `screenshots/stories-check.json` — вердикт browser-проверок.
- `screenshots/entry-{desktop,mobile}.png` — экран входа после правки.
- `screenshots/smoke-entry.png`, `screenshots/smoke-entry-mobile.png` — общий smoke.

## Ограничения

- Stories — локальные демо-данные. Создания, загрузки и редактирования нет.
- Просмотренные хранятся в `localStorage`; это осознанно, без аккаунтов и БД.
- Собственная плитка (`own`) показывает плюс, но не ведёт в профиль — профиль
  для остальных плиток доступен через отдельную ссылку.
- Desktop-режим stories вертикальный, без 9:16 и без snap-выравнивания плиток.
- Полный `npm run lint` остаётся красным из-за существующих проблем в других
  частях репозитория.

## P1 — предложения

1. Desktop: 9:16 превью и вертикальные media внутри плиток.
2. Snap-выравнивание плиток по центру и «липкая» первая плитка.
3. Превью историй в профиле: последняя stories автора как обложка.
4. Создание своей истории из `own` плитки.
5. Отдельные обводки для `new` и `seen`, если дизайн потребует большего
   контраста, чем сейчас даёт цвет градиента.
