# Cyprus Villas

Премиальный scroll-film сайт для аренды роскошных вилл на Кипре.

## Структура

- `index.html` — разметка scroll-film маршрута, коллекции вилл, календаря доступности, офиса и footer.
- `src/styles.css` — визуальная система, адаптив, языковой header, коллекция, календарь доступности и performance-friendly состояния.
- `src/main.js` — desktop video-scrub, mobile/tablet sprite-scrub, языки EN/RU/EL, сцены, форма, календарь доступности вилл и ленивая OpenStreetMap-карта офиса.

Календарь доступности (`#availability`) переключает виллы, показывает занятые/свободные даты помесячно и передаёт выбранный период (заезд/выезд) напрямую в форму брони с мгновенным пересчётом сметы. Данные о занятости хранятся как офсеты от текущей даты в `src/main.js`, поэтому календарь всегда выглядит актуальным без бэкенда.
- `assets/video` — локальные оптимизированные версии исходного видео для desktop scroll-scrub.
- `assets/video/frames` — WebP-спрайты для плавного mobile/tablet scroll-scrub без MP4 seek: `villa-tour-mobile-portrait-*` (404×720, портретная ориентация) и `villa-tour-mobile-strip-*` (960×540, альбомная); набор выбирается по ориентации экрана.
- `assets/gallery` и `assets/posters` — кадры, извлеченные из локального видео.
- `assets/villas` — сгенерированные и оптимизированные WebP-фото дополнительных вилл.

## Локальный запуск

```bash
node server.mjs
```

Затем открыть `http://localhost:4173`. Сервер поддерживает HTTP Range-запросы для desktop video-scrub; mobile/tablet версия использует нативный скролл и CSS sprite-scrub без video.currentTime.

На desktop карта офиса загружается через Leaflet/OpenStreetMap только при приближении к секции офиса. На mobile/tablet карта остается статичной, чтобы не перехватывать вертикальный touch-scroll.

## Регенерация мобильных спрайтов

Портретные листы (центральная 9:16-обрезка, каждый 2-й кадр, 6 листов по 30 кадров):

```bash
ffmpeg -i assets/video/villa-tour-scrub.mp4 \
  -vf "select='not(mod(n\,2))',crop=404:720:438:0,tile=6x5" \
  -fps_mode vfr -frames:v 6 -c:v libwebp -quality 82 \
  assets/video/frames/villa-tour-mobile-portrait-%02d.webp
```
