# Cyprus Villas

Премиальный scroll-film сайт для аренды роскошных вилл на Кипре.

## Структура

- `index.html` — разметка scroll-film маршрута, коллекции вилл, офиса и footer.
- `src/styles.css` — визуальная система, адаптив, языковой header, коллекция и performance-friendly состояния.
- `src/main.js` — desktop video-scrub, mobile/tablet sprite-scrub, языки EN/RU/EL, сцены, форма и ленивая OpenStreetMap-карта офиса.
- `assets/video` — локальные оптимизированные версии исходного видео для desktop scroll-scrub.
- `assets/video/frames` — WebP-спрайты для плавного mobile/tablet scroll-scrub без MP4 seek.
- `assets/gallery` и `assets/posters` — кадры, извлеченные из локального видео.
- `assets/villas` — сгенерированные и оптимизированные WebP-фото дополнительных вилл.

## Локальный запуск

```bash
node server.mjs
```

Затем открыть `http://localhost:4173`. Сервер поддерживает HTTP Range-запросы для desktop video-scrub; mobile/tablet версия использует нативный скролл и CSS sprite-scrub без video.currentTime.

На desktop карта офиса загружается через Leaflet/OpenStreetMap только при приближении к секции офиса. На mobile/tablet карта остается статичной, чтобы не перехватывать вертикальный touch-scroll.
