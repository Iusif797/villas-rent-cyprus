const root = document.documentElement;
const body = document.body;
const header = document.querySelector("[data-header]");
const filmTour = document.querySelector("[data-film-tour]");
const video = document.querySelector("#filmVideo");
const timecode = document.querySelector("[data-timecode]");
const scenes = Array.from(document.querySelectorAll("[data-scene]"));
const progressLinks = Array.from(document.querySelectorAll("[data-progress-index]"));
const bookingForm = document.querySelector(".booking-form");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const languageButtons = Array.from(document.querySelectorAll("[data-lang]"));
const officeMapElement = document.querySelector("[data-office-map]");
const officeMapCanvas = document.querySelector("[data-map-canvas]");
const officeMapLoading = document.querySelector("[data-map-loading]");

root.classList.remove("no-js");
root.classList.add("js");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const lerp = (from, to, progress) => from + (to - from) * progress;
const easeOut = (value) => 1 - Math.pow(1 - clamp(value), 3);

const translations = {
  en: {
    title: "Cyprus Villas | Scroll Film Rentals",
    description: "A cinematic scroll-controlled luxury villa rental experience in Cyprus.",
    skip: "Skip to booking",
    "brand.meta": "Private coastal rentals",
    "nav.tour": "Tour",
    "nav.service": "Service",
    "nav.villas": "Villas",
    "nav.booking": "Booking",
    "header.action": "Request dates",
    "hero.eyebrow": "Private coastal villas / Cyprus",
    "hero.title": "Million-euro villas on the first sea line",
    "hero.copy":
      "This is not a standard property page. Scroll and the film moves with you: from the coast and arrival sequence to the interiors, infinity pool and horizon.",
    "hero.primary": "Request private dates",
    "hero.secondary": "Start the tour",
    "scene1.eyebrow": "01 / Aerial approach",
    "scene1.title": "The camera descends over the water",
    "scene1.copy":
      "The first movement is a slow arrival. Scroll becomes camera motion: sea, cliffs, light and a house that only begins to reveal itself.",
    "scene2.eyebrow": "02 / Arrival",
    "scene2.title": "The estate appears from sunset",
    "scene2.copy":
      "Arches, stone, palms and the pool assemble into one frame. Architecture does not compete with the sea; it frames it.",
    "scene3.eyebrow": "03 / Threshold",
    "scene3.title": "The doors open with the scroll",
    "scene3.copy":
      "The site does not jump between blocks. It steps inside with you: frame, mask and copy are synchronized to the exact scroll position.",
    "scene4.eyebrow": "04 / Interior",
    "scene4.title": "The first breath inside the villa",
    "scene4.copy":
      "Light travels through panoramic glass. Marble and timber stay tactile, while the sea remains part of the room.",
    "scene5.eyebrow": "05 / Living room",
    "scene5.title": "A room made for long evenings",
    "scene5.copy": "The lounge is planned around quiet light, long sightlines and a seamless escape to the terrace.",
    "scene6.eyebrow": "06 / Kitchen",
    "scene6.title": "A private restaurant inside the house",
    "scene6.copy":
      "A stone island, concealed light and chef-ready equipment create a kitchen built for entertaining without noise.",
    "scene7.eyebrow": "07 / Primary suite",
    "scene7.title": "The morning begins with the horizon",
    "scene7.copy":
      "The primary suite opens toward water and keeps only what matters inside: silence, texture and warm evening light.",
    "scene8.eyebrow": "08 / Spa bathroom",
    "scene8.title": "A marble wellness ritual",
    "scene8.copy":
      "The bathroom continues the interior language: natural stone, warm lines of light and the calm of a private spa.",
    "scene9.eyebrow": "09 / Terrace",
    "scene9.title": "The move outside is almost invisible",
    "scene9.copy": "The terrace extends the living room: loungers, shade, open-air dinners and slow evenings by the water.",
    "scene10.eyebrow": "10 / Infinity pool",
    "scene10.title": "Water merges with the sea",
    "scene10.copy":
      "The defining frame of the villa appears at sunset: an edge-free pool, a private garden line and an open horizon.",
    "scene11.eyebrow": "11 / Panorama",
    "scene11.title": "The final frame belongs to the sea",
    "scene11.copy":
      "As the tour slows down, the point becomes clear: these villas are not built around square meters, but around presence on the Mediterranean.",
    "benefits.eyebrow": "Rental privileges",
    "benefits.title": "Service that stays behind the camera",
    "benefit1.title": "Private concierge",
    "benefit1.copy": "Transfers, chef, yacht, flowers, wine list and day-by-day planning before arrival.",
    "benefit2.title": "Total privacy",
    "benefit2.copy": "Separate grounds, calm coastline and discreet service without unnecessary contact.",
    "benefit3.title": "Arrival-ready estate",
    "benefit3.copy": "Temperature, lighting, kitchen and first-evening details prepared around your rhythm.",
    "collection.eyebrow": "Signature villas",
    "collection.title": "A curated portfolio of impossible addresses",
    "collection.copy":
      "Beyond the film villa, Cyprus Villas represents a private collection of coastal estates selected for architecture, privacy, view and service level.",
    "villa1.meta": "Akamas Peninsula / 7 suites",
    "villa1.title": "Seafront Glass Estate",
    "villa1.copy": "A cliff-edge residence with sculptural terraces, a glass-wrapped salon and a 32-meter infinity pool.",
    "villa1.price": "From EUR 18,500 / night",
    "villa2.meta": "Limassol Hills / 6 suites",
    "villa2.title": "Hillside Courtyard House",
    "villa2.copy": "A limestone retreat above the city with olive gardens, a spa pavilion and blue-hour sea views.",
    "villa2.price": "From EUR 14,900 / night",
    "villa3.meta": "Paphos Bay / 8 suites",
    "villa3.title": "Bronze Bay Residence",
    "villa3.copy": "A cinematic sunset estate with bronze glass, fire lounge and a pool that wraps the architecture.",
    "villa3.price": "From EUR 22,000 / night",
    "booking.eyebrow": "Private request",
    "booking.title": "Request dates for a private viewing",
    "booking.copy":
      "After your request, a villa director will clarify the guest profile, rhythm of travel and prepare a personal Cyprus residence plan.",
    "form.name": "Name",
    "form.contact": "Phone or email",
    "form.arrival": "Arrival",
    "form.departure": "Departure",
    "form.message": "Guests and preferences",
    "form.placeholder": "Example: 6 guests, chef, yacht, family dinner",
    "form.submit": "Send private request",
    "form.status": "Request prepared. A villa director will contact you to confirm the details.",
    "office.eyebrow": "Cyprus office",
    "office.title": "Island desk, private access",
    "office.copy":
      "Our fictional Cyprus desk is placed close to the coast for owner meetings, guest arrivals and last-minute residence preparation.",
    "office.address": "14 Poseidon Avenue, Agios Tychonas, Limassol 4532, Cyprus",
    "map.label": "Private office",
    "map.loading": "Loading real map",
    "map.open": "Open in OpenStreetMap",
    "map.popup": "Cyprus Villas private office",
    "map.error": "Map connection is unavailable. Open the location in OpenStreetMap.",
    "footer.note": "Cinematic private rental experience for guests who choose silence, water and exact service.",
    "footer.locationTitle": "Location",
    "footer.location": "Agios Tychonas, Limassol / Mediterranean Sea",
    "footer.contactTitle": "Contact",
    "footer.privateTitle": "Private",
    "footer.private": "Concierge / Chef-ready kitchens / Infinity pools",
    "footer.credit": "Designed and developed by Iusif Mamedov, Full Stack Developer.",
    "footer.portfolio": "Portfolio",
    "footer.github": "GitHub",
  },
  ru: {
    title: "Cyprus Villas | Scroll Film Rentals",
    description: "Кинематографическая scroll-экскурсия по премиальным виллам на Кипре.",
    skip: "Перейти к бронированию",
    "brand.meta": "Приватная аренда у моря",
    "nav.tour": "Тур",
    "nav.service": "Сервис",
    "nav.villas": "Виллы",
    "nav.booking": "Бронь",
    "header.action": "Запросить даты",
    "hero.eyebrow": "Приватные виллы у моря / Кипр",
    "hero.title": "Виллы на миллионы евро на первой линии моря",
    "hero.copy":
      "Это не обычная страница недвижимости. Прокручивайте сайт, и фильм будет двигаться вместе с вами: берег, приближение, интерьер, инфинити-бассейн и горизонт.",
    "hero.primary": "Запросить приватные даты",
    "hero.secondary": "Начать экскурсию",
    "scene1.eyebrow": "01 / Вид с высоты",
    "scene1.title": "Камера опускается над водой",
    "scene1.copy":
      "Первое движение — медленное приближение. Скролл становится движением камеры: море, скалы, свет и дом, который только начинает раскрываться.",
    "scene2.eyebrow": "02 / Приближение",
    "scene2.title": "Дом появляется из заката",
    "scene2.copy":
      "Арки, камень, пальмы и бассейн собираются в один кадр. Архитектура не спорит с морем, а обрамляет его.",
    "scene3.eyebrow": "03 / Порог",
    "scene3.title": "Двери открываются вместе со скроллом",
    "scene3.copy":
      "Сайт не прыгает между блоками. Он делает шаг внутрь вместе с вами: кадр, маска и текст синхронизированы с точной позицией прокрутки.",
    "scene4.eyebrow": "04 / Интерьер",
    "scene4.title": "Первый вдох внутри виллы",
    "scene4.copy": "Свет проходит через панорамное стекло. Мрамор и дерево остаются тактильными, а море остается частью комнаты.",
    "scene5.eyebrow": "05 / Гостиная",
    "scene5.title": "Комната для длинных вечеров",
    "scene5.copy": "Гостиная построена вокруг мягкого света, длинных перспектив и бесшовного выхода на террасу.",
    "scene6.eyebrow": "06 / Кухня",
    "scene6.title": "Частный ресторан внутри дома",
    "scene6.copy": "Каменный остров, скрытая подсветка и chef-ready техника создают кухню для приема гостей без суеты.",
    "scene7.eyebrow": "07 / Мастер-сьют",
    "scene7.title": "Утро начинается с горизонта",
    "scene7.copy": "Мастер-сьют открыт к воде и оставляет внутри только важное: тишину, текстуры и теплый вечерний свет.",
    "scene8.eyebrow": "08 / Спа-ванная",
    "scene8.title": "Мраморный wellness-ритуал",
    "scene8.copy": "Ванная продолжает язык интерьера: натуральный камень, теплые линии света и спокойствие приватного спа.",
    "scene9.eyebrow": "09 / Терраса",
    "scene9.title": "Переход наружу почти незаметен",
    "scene9.copy": "Терраса продолжает гостиную: лежаки, тень, ужины на воздухе и медленные вечера у воды.",
    "scene10.eyebrow": "10 / Инфинити-бассейн",
    "scene10.title": "Вода сливается с морем",
    "scene10.copy": "Главный кадр раскрывается на закате: бассейн без видимой границы, приватный сад и открытый горизонт.",
    "scene11.eyebrow": "11 / Панорама",
    "scene11.title": "Финальный кадр принадлежит морю",
    "scene11.copy": "Когда тур замедляется, становится понятно: эти виллы построены не вокруг метров, а вокруг присутствия у Средиземного моря.",
    "benefits.eyebrow": "Привилегии аренды",
    "benefits.title": "Сервис, который остается за кадром",
    "benefit1.title": "Приватный concierge",
    "benefit1.copy": "Трансфер, повар, яхта, цветы, винная карта и сценарий каждого дня до приезда гостей.",
    "benefit2.title": "Полная приватность",
    "benefit2.copy": "Отдельная территория, спокойная береговая линия и discreet-сервис без лишнего контакта.",
    "benefit3.title": "Готовность к заезду",
    "benefit3.copy": "Температура, свет, кухня и детали первого вечера готовятся под ваш ритм.",
    "collection.eyebrow": "Signature villas",
    "collection.title": "Кураторская коллекция невозможных адресов",
    "collection.copy": "Помимо виллы из фильма, Cyprus Villas представляет приватную коллекцию домов, выбранных за архитектуру, приватность, вид и уровень сервиса.",
    "villa1.meta": "Полуостров Акамас / 7 сьютов",
    "villa1.title": "Seafront Glass Estate",
    "villa1.copy": "Резиденция на скале со скульптурными террасами, стеклянным салоном и 32-метровым инфинити-бассейном.",
    "villa1.price": "От EUR 18 500 / ночь",
    "villa2.meta": "Холмы Лимасола / 6 сьютов",
    "villa2.title": "Hillside Courtyard House",
    "villa2.copy": "Каменная вилла над городом с оливковыми садами, спа-павильоном и видом на море в синий час.",
    "villa2.price": "От EUR 14 900 / ночь",
    "villa3.meta": "Бухта Пафоса / 8 сьютов",
    "villa3.title": "Bronze Bay Residence",
    "villa3.copy": "Кинематографичная резиденция с бронзовым стеклом, fire lounge и бассейном, который огибает архитектуру.",
    "villa3.price": "От EUR 22 000 / ночь",
    "booking.eyebrow": "Private request",
    "booking.title": "Запросите даты для приватного просмотра",
    "booking.copy": "После заявки villa director уточнит состав гостей, ритм поездки и подготовит персональный план резиденции на Кипре.",
    "form.name": "Имя",
    "form.contact": "Телефон или email",
    "form.arrival": "Заезд",
    "form.departure": "Выезд",
    "form.message": "Гости и пожелания",
    "form.placeholder": "Например: 6 гостей, повар, яхта, семейный ужин",
    "form.submit": "Отправить приватный запрос",
    "form.status": "Запрос подготовлен. Villa director свяжется с вами для подтверждения деталей.",
    "office.eyebrow": "Офис на Кипре",
    "office.title": "Островной офис, приватный доступ",
    "office.copy": "Наш фейковый кипрский офис расположен рядом с побережьем для встреч с владельцами, приема гостей и подготовки резиденций.",
    "office.address": "14 Poseidon Avenue, Agios Tychonas, Limassol 4532, Cyprus",
    "map.label": "Приватный офис",
    "map.loading": "Загружается реальная карта",
    "map.open": "Открыть в OpenStreetMap",
    "map.popup": "Приватный офис Cyprus Villas",
    "map.error": "Карта сейчас недоступна. Откройте локацию в OpenStreetMap.",
    "footer.note": "Кинематографичный опыт приватной аренды для гостей, которые выбирают тишину, воду и точный сервис.",
    "footer.locationTitle": "Локация",
    "footer.location": "Agios Tychonas, Limassol / Mediterranean Sea",
    "footer.contactTitle": "Контакты",
    "footer.privateTitle": "Private",
    "footer.private": "Concierge / Chef-ready кухни / Инфинити-бассейны",
    "footer.credit": "Сайт разработан мной: Iusif Mamedov, Full Stack-разработчик.",
    "footer.portfolio": "Портфолио",
    "footer.github": "GitHub",
  },
  el: {
    title: "Cyprus Villas | Scroll Film Rentals",
    description: "Κινηματογραφική εμπειρία ενοικίασης πολυτελών επαύλεων στην Κύπρο.",
    skip: "Μετάβαση στην κράτηση",
    "brand.meta": "Ιδιωτικές παραθαλάσσιες επαύλεις",
    "nav.tour": "Περιήγηση",
    "nav.service": "Υπηρεσία",
    "nav.villas": "Επαύλεις",
    "nav.booking": "Κράτηση",
    "header.action": "Ζητήστε ημερομηνίες",
    "hero.eyebrow": "Ιδιωτικές παραθαλάσσιες επαύλεις / Κύπρος",
    "hero.title": "Επαύλεις εκατομμυρίων στην πρώτη γραμμή της θάλασσας",
    "hero.copy": "Δεν είναι μια συνηθισμένη σελίδα ακινήτου. Κάντε scroll και η ταινία κινείται μαζί σας: ακτή, άφιξη, εσωτερικό, infinity pool και ορίζοντας.",
    "hero.primary": "Ζητήστε ιδιωτικές ημερομηνίες",
    "hero.secondary": "Ξεκινήστε την περιήγηση",
    "scene1.eyebrow": "01 / Εναέρια άφιξη",
    "scene1.title": "Η κάμερα κατεβαίνει πάνω από το νερό",
    "scene1.copy": "Η πρώτη κίνηση είναι αργή άφιξη. Το scroll γίνεται κίνηση κάμερας: θάλασσα, βράχια, φως και ένα σπίτι που αρχίζει να αποκαλύπτεται.",
    "scene2.eyebrow": "02 / Άφιξη",
    "scene2.title": "Η έπαυλη εμφανίζεται μέσα στο ηλιοβασίλεμα",
    "scene2.copy": "Καμάρες, πέτρα, φοίνικες και πισίνα γίνονται ένα κάδρο. Η αρχιτεκτονική δεν ανταγωνίζεται τη θάλασσα, την πλαισιώνει.",
    "scene3.eyebrow": "03 / Κατώφλι",
    "scene3.title": "Οι πόρτες ανοίγουν με το scroll",
    "scene3.copy": "Η σελίδα δεν πηδάει από ενότητα σε ενότητα. Μπαίνει μέσα μαζί σας: κάδρο, μάσκα και κείμενο συγχρονίζονται με την κύλιση.",
    "scene4.eyebrow": "04 / Εσωτερικό",
    "scene4.title": "Η πρώτη ανάσα μέσα στην έπαυλη",
    "scene4.copy": "Το φως περνά από το πανοραμικό γυαλί. Μάρμαρο και ξύλο μένουν απτά, ενώ η θάλασσα παραμένει μέρος του χώρου.",
    "scene5.eyebrow": "05 / Σαλόνι",
    "scene5.title": "Ένας χώρος για μακριές βραδιές",
    "scene5.copy": "Το lounge σχεδιάστηκε γύρω από ήρεμο φως, μεγάλες οπτικές φυγές και άμεση έξοδο στην ταράτσα.",
    "scene6.eyebrow": "06 / Κουζίνα",
    "scene6.title": "Ιδιωτικό εστιατόριο μέσα στο σπίτι",
    "scene6.copy": "Νησί από πέτρα, κρυφός φωτισμός και εξοπλισμός chef-ready δημιουργούν κουζίνα για φιλοξενία χωρίς θόρυβο.",
    "scene7.eyebrow": "07 / Κύρια σουίτα",
    "scene7.title": "Το πρωί αρχίζει με τον ορίζοντα",
    "scene7.copy": "Η κύρια σουίτα ανοίγει προς το νερό και κρατά μόνο τα απαραίτητα: σιωπή, υφές και ζεστό βραδινό φως.",
    "scene8.eyebrow": "08 / Spa bathroom",
    "scene8.title": "Μαρμάρινη τελετουργία ευεξίας",
    "scene8.copy": "Το μπάνιο συνεχίζει τη γλώσσα του εσωτερικού: φυσική πέτρα, ζεστές γραμμές φωτός και ηρεμία ιδιωτικού spa.",
    "scene9.eyebrow": "09 / Βεράντα",
    "scene9.title": "Η έξοδος προς τα έξω είναι σχεδόν αόρατη",
    "scene9.copy": "Η βεράντα επεκτείνει το σαλόνι: ξαπλώστρες, σκιά, δείπνα έξω και αργά βράδια δίπλα στο νερό.",
    "scene10.eyebrow": "10 / Infinity pool",
    "scene10.title": "Το νερό ενώνεται με τη θάλασσα",
    "scene10.copy": "Το καθοριστικό κάδρο εμφανίζεται στο ηλιοβασίλεμα: πισίνα χωρίς όριο, ιδιωτικός κήπος και ανοικτός ορίζοντας.",
    "scene11.eyebrow": "11 / Πανόραμα",
    "scene11.title": "Το τελικό κάδρο ανήκει στη θάλασσα",
    "scene11.copy": "Καθώς η περιήγηση επιβραδύνει, γίνεται σαφές: αυτές οι επαύλεις δεν χτίστηκαν γύρω από τετραγωνικά, αλλά γύρω από παρουσία στη Μεσόγειο.",
    "benefits.eyebrow": "Προνόμια ενοικίασης",
    "benefits.title": "Υπηρεσία που μένει πίσω από την κάμερα",
    "benefit1.title": "Ιδιωτικό concierge",
    "benefit1.copy": "Μεταφορές, chef, yacht, λουλούδια, wine list και σχεδιασμός ημέρας πριν την άφιξη.",
    "benefit2.title": "Απόλυτη ιδιωτικότητα",
    "benefit2.copy": "Ξεχωριστοί χώροι, ήρεμη ακτογραμμή και διακριτική υπηρεσία χωρίς περιττή επαφή.",
    "benefit3.title": "Έτοιμη για άφιξη",
    "benefit3.copy": "Θερμοκρασία, φωτισμός, κουζίνα και λεπτομέρειες πρώτης βραδιάς ετοιμάζονται γύρω από τον ρυθμό σας.",
    "collection.eyebrow": "Signature villas",
    "collection.title": "Επιμελημένο portfolio αδύνατων διευθύνσεων",
    "collection.copy": "Πέρα από την έπαυλη της ταινίας, το Cyprus Villas εκπροσωπεί ιδιωτική συλλογή παραθαλάσσιων κατοικιών με αρχιτεκτονική, ιδιωτικότητα, θέα και επίπεδο υπηρεσίας.",
    "villa1.meta": "Χερσόνησος Ακάμα / 7 σουίτες",
    "villa1.title": "Seafront Glass Estate",
    "villa1.copy": "Κατοικία στην άκρη του βράχου με γλυπτικές βεράντες, γυάλινο σαλόνι και infinity pool 32 μέτρων.",
    "villa1.price": "Από EUR 18.500 / νύχτα",
    "villa2.meta": "Λόφοι Λεμεσού / 6 σουίτες",
    "villa2.title": "Hillside Courtyard House",
    "villa2.copy": "Ασβεστολιθικό καταφύγιο πάνω από την πόλη με ελαιώνες, spa pavilion και θέα θάλασσας στο blue hour.",
    "villa2.price": "Από EUR 14.900 / νύχτα",
    "villa3.meta": "Κόλπος Πάφου / 8 σουίτες",
    "villa3.title": "Bronze Bay Residence",
    "villa3.copy": "Κινηματογραφική έπαυλη ηλιοβασιλέματος με bronze glass, fire lounge και πισίνα που αγκαλιάζει την αρχιτεκτονική.",
    "villa3.price": "Από EUR 22.000 / νύχτα",
    "booking.eyebrow": "Ιδιωτικό αίτημα",
    "booking.title": "Ζητήστε ημερομηνίες για ιδιωτική προβολή",
    "booking.copy": "Μετά το αίτημα, ένας villa director θα επιβεβαιώσει το προφίλ των επισκεπτών και θα ετοιμάσει προσωπικό πλάνο διαμονής στην Κύπρο.",
    "form.name": "Όνομα",
    "form.contact": "Τηλέφωνο ή email",
    "form.arrival": "Άφιξη",
    "form.departure": "Αναχώρηση",
    "form.message": "Επισκέπτες και προτιμήσεις",
    "form.placeholder": "Παράδειγμα: 6 επισκέπτες, chef, yacht, οικογενειακό δείπνο",
    "form.submit": "Στείλτε ιδιωτικό αίτημα",
    "form.status": "Το αίτημα ετοιμάστηκε. Ένας villa director θα επικοινωνήσει για επιβεβαίωση.",
    "office.eyebrow": "Γραφείο Κύπρου",
    "office.title": "Γραφείο στο νησί, ιδιωτική πρόσβαση",
    "office.copy": "Το φανταστικό μας κυπριακό γραφείο βρίσκεται κοντά στην ακτή για συναντήσεις ιδιοκτητών, αφίξεις επισκεπτών και προετοιμασία κατοικιών.",
    "office.address": "14 Poseidon Avenue, Άγιος Τύχωνας, Λεμεσός 4532, Κύπρος",
    "map.label": "Ιδιωτικό γραφείο",
    "map.loading": "Φόρτωση πραγματικού χάρτη",
    "map.open": "Άνοιγμα στο OpenStreetMap",
    "map.popup": "Ιδιωτικό γραφείο Cyprus Villas",
    "map.error": "Ο χάρτης δεν είναι διαθέσιμος. Ανοίξτε την τοποθεσία στο OpenStreetMap.",
    "footer.note": "Κινηματογραφική εμπειρία ιδιωτικής ενοικίασης για επισκέπτες που επιλέγουν σιωπή, νερό και ακριβή υπηρεσία.",
    "footer.locationTitle": "Τοποθεσία",
    "footer.location": "Άγιος Τύχωνας, Λεμεσός / Μεσόγειος Θάλασσα",
    "footer.contactTitle": "Επικοινωνία",
    "footer.privateTitle": "Private",
    "footer.private": "Concierge / Chef-ready κουζίνες / Infinity pools",
    "footer.credit": "Σχεδιάστηκε και αναπτύχθηκε από τον Iusif Mamedov, Full Stack Developer.",
    "footer.portfolio": "Portfolio",
    "footer.github": "GitHub",
  },
};

const getConnection = () => navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const isLowPowerDevice = () => {
  const connection = getConnection();
  const savesData = Boolean(connection?.saveData);
  const lowMemory = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
  const lowConcurrency = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
  return savesData || lowMemory || lowConcurrency || reduceMotionQuery.matches;
};

const shouldScrubVideo = () => !reduceMotionQuery.matches && !getConnection()?.saveData;

let activeScene = null;
let activeScenePosition = 0;
let activeIndex = 0;
let frameRequested = false;
let resizeTimer = 0;
let lastSeek = -1;
let targetVideoTime = 0;
let smoothedVideoTime = 0;
let lastLoopTimestamp = 0;
let metadataReady = false;
let liteMode = isLowPowerDevice();
let activeLanguage = localStorage.getItem("cyprus-villas-language") || "en";
let leafletPromise = null;
let officeMap = null;
let officeMarker = null;

const OFFICE_LOCATION = [34.7138, 33.1687];
const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

body.classList.toggle("is-lite", liteMode);

const applyLanguage = (language) => {
  const dictionary = translations[language] || translations.en;
  activeLanguage = translations[language] ? language : "en";
  document.documentElement.lang = activeLanguage;
  document.title = dictionary.title || translations.en.title;

  const description = document.querySelector('meta[name="description"]');
  if (description && dictionary.description) {
    description.setAttribute("content", dictionary.description);
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      element.setAttribute("placeholder", dictionary[key]);
    }
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === activeLanguage);
  });

  updateOfficeMapPopup();
  localStorage.setItem("cyprus-villas-language", activeLanguage);
};

function updateOfficeMapPopup() {
  if (!officeMarker) return;
  const dictionary = translations[activeLanguage] || translations.en;
  officeMarker.bindPopup(dictionary["map.popup"] || translations.en["map.popup"]);
}

const loadStylesheet = (href) => {
  if (document.querySelector(`link[href="${href}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.append(link);
};

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);

    if (window.L) {
      resolve(window.L);
      return;
    }

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.L), { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = reject;
    document.head.append(script);
  });

const loadLeaflet = () => {
  if (leafletPromise) return leafletPromise;

  loadStylesheet(LEAFLET_CSS);
  leafletPromise = loadScript(LEAFLET_JS);
  return leafletPromise;
};

const setOfficeMapError = () => {
  const dictionary = translations[activeLanguage] || translations.en;
  officeMapElement?.classList.remove("is-loading");
  officeMapElement?.classList.add("has-error");

  if (officeMapLoading) {
    officeMapLoading.querySelector("p").textContent = dictionary["map.error"] || translations.en["map.error"];
  }
};

const initOfficeMap = async () => {
  if (!officeMapElement || !officeMapCanvas || officeMap) return;

  officeMapElement.classList.add("is-loading");

  try {
    const L = await loadLeaflet();
    const animateMap = !liteMode && !reduceMotionQuery.matches;

    officeMap = L.map(officeMapCanvas, {
      attributionControl: true,
      scrollWheelZoom: false,
      zoomControl: true,
      zoomAnimation: animateMap,
      fadeAnimation: false,
      markerZoomAnimation: animateMap,
      tap: true,
    }).setView(OFFICE_LOCATION, 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
      updateWhenIdle: true,
      keepBuffer: 2,
    }).addTo(officeMap);

    officeMarker = L.marker(OFFICE_LOCATION, {
      icon: L.divIcon({
        className: "office-map__pin",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
      keyboard: false,
    }).addTo(officeMap);

    updateOfficeMapPopup();
    officeMarker.openPopup();
    officeMapElement.classList.remove("is-loading");
    officeMapElement.classList.add("is-loaded");
    window.requestAnimationFrame(() => officeMap.invalidateSize());
  } catch {
    setOfficeMapError();
  }
};

const setupOfficeMap = () => {
  if (!officeMapElement) return;

  if (!("IntersectionObserver" in window)) {
    window.addEventListener("load", initOfficeMap, { once: true });
    return;
  }

  const mapObserver = new IntersectionObserver(
    (entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;

      observer.disconnect();
      initOfficeMap();
    },
    { rootMargin: "640px 0px", threshold: 0.01 },
  );

  mapObserver.observe(officeMapElement);
};

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, Number.isFinite(seconds) ? seconds : 0);
  const minutes = Math.floor(safeSeconds / 60).toString().padStart(2, "0");
  const rest = Math.floor(safeSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
};

const setVideoTime = (targetTime) => {
  if (!video || !metadataReady || !shouldScrubVideo()) return;

  const duration = Number.isFinite(video.duration) ? video.duration : 15;
  targetVideoTime = clamp(targetTime, 0, Math.max(0, duration - 0.04));
};

const stepVideoScrub = (timestamp) => {
  if (!metadataReady) return;

  const elapsed = Math.min(64, timestamp - lastLoopTimestamp);
  const smoothing = 1 - Math.exp(-elapsed / 70);
  smoothedVideoTime = lerp(smoothedVideoTime, targetVideoTime, smoothing);

  if (Math.abs(smoothedVideoTime - targetVideoTime) < 0.008) {
    smoothedVideoTime = targetVideoTime;
  }

  if (video.seeking) return;
  if (Math.abs(smoothedVideoTime - lastSeek) < 0.016) return;

  try {
    video.currentTime = smoothedVideoTime;
    lastSeek = smoothedVideoTime;
  } catch {
    lastSeek = -1;
  }
};

const runScrubLoop = (timestamp) => {
  stepVideoScrub(timestamp);
  lastLoopTimestamp = timestamp;
  window.requestAnimationFrame(runScrubLoop);
};

const setActiveScene = (scene, position) => {
  if (!scene) return;

  activeScene = scene;
  activeScenePosition = position;
  activeIndex = Number(scene.dataset.scene || 0);
  root.style.setProperty("--active-scene", activeIndex);

  scenes.forEach((item) => item.classList.toggle("is-active", item === scene));
  progressLinks.forEach((link) => {
    link.classList.toggle("is-active", Number(link.dataset.progressIndex) === activeIndex);
  });
};

const resolveActiveScene = () => {
  const viewportAnchor = window.innerHeight * 0.55;
  let bestScene = scenes[0];
  let bestPosition = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  scenes.forEach((scene, position) => {
    const rect = scene.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    const center = rect.top + rect.height * 0.5;
    const distance = Math.abs(center - viewportAnchor);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestScene = scene;
      bestPosition = position;
    }
  });

  setActiveScene(bestScene, bestPosition);
};

const getSceneTiming = () => {
  if (!activeScene) return { localProgress: 0, eased: 0, targetTime: 0 };

  const rect = activeScene.getBoundingClientRect();
  const viewportAnchor = window.innerHeight * 0.55;
  const localProgress = clamp((viewportAnchor - rect.top) / Math.max(1, rect.height));
  const eased = easeOut(localProgress);
  const currentTime = Number(activeScene.dataset.time || 0);
  const nextScene = scenes[Math.min(activeScenePosition + 1, scenes.length - 1)];
  const nextTime = Number(nextScene?.dataset.time || currentTime);
  const targetTime = lerp(currentTime, nextTime, localProgress);

  return { localProgress, eased, targetTime };
};

const getTourProgress = () => {
  if (!filmTour) return 0;
  const rect = filmTour.getBoundingClientRect();
  const scrollable = Math.max(1, rect.height - window.innerHeight);
  return clamp((0 - rect.top) / scrollable);
};

const updateFrame = () => {
  frameRequested = false;

  const scrollTop = window.scrollY || window.pageYOffset;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  root.style.setProperty("--page-progress", clamp(scrollTop / maxScroll).toFixed(4));
  root.style.setProperty("--film-progress", getTourProgress().toFixed(4));
  header?.classList.toggle("is-scrolled", scrollTop > 18);

  resolveActiveScene();

  if (!activeScene) return;

  const { eased, targetTime } = getSceneTiming();
  const targetScale = Number(activeScene.dataset.scale || 1);
  const targetX = Number(activeScene.dataset.x || 0);
  const targetY = Number(activeScene.dataset.y || 0);
  const scale = liteMode ? 1 : 1 + (targetScale - 1) * eased;

  root.style.setProperty("--scene-progress", eased.toFixed(4));
  root.style.setProperty("--film-scale", scale.toFixed(4));
  root.style.setProperty("--film-x", `${(targetX * eased).toFixed(3)}%`);
  root.style.setProperty("--film-y", `${(targetY * eased).toFixed(3)}%`);
  root.style.setProperty("--film-brightness", activeIndex >= 12 ? "0.56" : "0.78");
  root.style.setProperty("--film-saturate", activeIndex >= 12 ? "0.9" : "1.04");

  const doorActive = activeScene.dataset.door === "true" ? 1 : 0;
  root.style.setProperty("--door-active", doorActive.toString());
  root.style.setProperty("--door-open", doorActive ? eased.toFixed(4) : "0");

  setVideoTime(targetTime);
  if (timecode) {
    timecode.textContent = formatTime(targetTime);
  }
};

const requestFrame = () => {
  if (frameRequested) return;
  frameRequested = true;
  window.requestAnimationFrame(updateFrame);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    }
  },
  { rootMargin: "0px 0px -18% 0px", threshold: 0.18 },
);

for (const scene of scenes) {
  revealObserver.observe(scene);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang || "en");
  });
});

for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const headerOffset = header ? Math.ceil(header.getBoundingClientRect().height) + 18 : 0;
    const top =
      target.id === "hero"
        ? 0
        : Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);

    window.scrollTo({
      top,
      behavior: reduceMotionQuery.matches ? "auto" : "smooth",
    });
  });
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = bookingForm.querySelector(".form-status");
    if (status) {
      status.textContent = translations[activeLanguage]?.["form.status"] || translations.en["form.status"];
    }
    bookingForm.reset();
  });
}

const markVideoReady = () => {
  metadataReady = true;
  video.pause();
  smoothedVideoTime = video.currentTime;
  lastSeek = video.currentTime;
  requestFrame();
};

if (video) {
  if (video.readyState >= 1) {
    markVideoReady();
  } else {
    video.addEventListener("loadedmetadata", markVideoReady, { once: true });
  }

  if (shouldScrubVideo()) {
    window.requestAnimationFrame(runScrubLoop);
  }
}

reduceMotionQuery.addEventListener("change", () => {
  liteMode = isLowPowerDevice();
  body.classList.toggle("is-lite", liteMode);
  requestFrame();
});

window.addEventListener("scroll", requestFrame, { passive: true });
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(requestFrame, 80);
});

applyLanguage(activeLanguage);
setupOfficeMap();
requestFrame();
