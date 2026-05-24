// Инициализация карт при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Координаты для карты (Санкт-Петербург)
  const mapCenter = [59.934280, 30.335099];
  
  // Мини-карта в карточке
  const miniMap = L.map('miniMap', {
    center: mapCenter,
    zoom: 11,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    tap: false
  });
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ''
  }).addTo(miniMap);
  
  // Добавляем маркеры на мини-карту
  const sortingPoints = [
    [59.934280, 30.335099],
    [59.938636, 30.322470],
    [59.920724, 30.315367]
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
        attribution: ''
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
