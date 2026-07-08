# Cyprus Villas

Премиальный scroll-film сайт для аренды роскошных вилл на Кипре.

## Структура

- `index.html` — разметка scroll-film маршрута, коллекции вилл, офиса и footer.
- `src/styles.css` — визуальная система, адаптив, языковой header, коллекция и performance-friendly состояния.
- `src/main.js` — desktop video-scrub, mobile canvas frame-scrub, языки EN/RU/EL, сцены, форма и ленивая OpenStreetMap-карта офиса.
- `assets/video` — локальные оптимизированные версии исходного видео и мобильные WebP-спрайты в `assets/video/frames`.
- `assets/gallery` и `assets/posters` — кадры, извлеченные из локального видео.
- `assets/villas` — сгенерированные и оптимизированные WebP-фото дополнительных вилл.

## Локальный запуск

```bash
node server.mjs
```

Затем открыть `http://localhost:4173`. Сервер поддерживает HTTP Range-запросы для desktop video-scrub и отдает WebP-спрайты для плавного mobile frame-scrub.

Карта офиса загружается через Leaflet/OpenStreetMap только при приближении к секции офиса, чтобы не влиять на первый экран и плавность scroll-film.
