// Инициализация карт при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Координаты для карты (Москва по умолчанию)
  const mapCenter = [55.751244, 37.618423];
  
  // Мини-карта в карточке
  const miniMap = L.map('miniMap', {
    center: mapCenter,
    zoom: 10,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    tap: false
  });
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(miniMap);
  
  // Добавляем маркеры на мини-карту
  const sortingPoints = [
    [55.751244, 37.618423],
    [55.755814, 37.617635],
    [55.748915, 37.625110]
  ];
  
  sortingPoints.forEach(point => {
    L.marker(point).addTo(miniMap);
  });
  
  // Полноэкранная карта в модальном окне
  let fullMap = null;
  
  // Открытие модального окна с картой
  const mapCard = document.getElementById('mapCard');
  const mapModal = new bootstrap.Modal(document.getElementById('mapModal'));
  
  mapCard.addEventListener('click', function() {
    mapModal.show();
  });
  
  // Инициализация полной карты при открытии модального окна
  document.getElementById('mapModal').addEventListener('shown.bs.modal', function() {
    if (!fullMap) {
      fullMap = L.map('fullMap', {
        center: mapCenter,
        zoom: 12
      });
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(fullMap);
      
      // Добавляем маркеры на полную карту
      sortingPoints.forEach(point => {
        L.marker(point)
          .addTo(fullMap)
          .bindPopup('Пункт сортировки');
      });
    } else {
      // Обновляем размер карты после показа
      setTimeout(() => {
        fullMap.invalidateSize();
      }, 100);
    }
  });
});
