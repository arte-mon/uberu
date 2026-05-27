// Инициализация карты с цветными маркерами
document.addEventListener('DOMContentLoaded', function() {
  // Координаты для карты (Санкт-Петербург)
  const mapCenter = [59.934280, 30.335099];
  
  // Данные о пунктах сортировки с цветами (красный, желтый, зеленый)
  const sortingPoints = [
    { coords: [59.934280, 30.335099], color: 'red', name: 'Красная метка - Невский' },
    { coords: [59.938636, 30.322470], color: 'yellow', name: 'Желтая метка - Васильевский' },
    { coords: [59.920724, 30.315367], color: 'green', name: 'Зеленая метка - Пушкинская' },
    { coords: [59.950000, 30.350000], color: 'red', name: 'Красная метка - Петроградская' },
    { coords: [59.910000, 30.300000], color: 'yellow', name: 'Желтая метка - Центр' },
    { coords: [59.945000, 30.380000], color: 'green', name: 'Зеленая метка - Лиговский' },
    { coords: [59.925000, 30.340000], color: 'red', name: 'Красная метка - Спасская' },
    { coords: [59.932000, 30.328000], color: 'yellow', name: 'Желтая метка - Сенная' },
    { coords: [59.940000, 30.345000], color: 'green', name: 'Зеленая метка - Чернышевская' }
  ];
  
  // Цвета для маркеров
  const markerColors = {
    red: '#ff4444',
    yellow: '#ffcc00',
    green: '#0ba452'
  };
  
  // Функция создания цветного маркера
  function createColoredMarker(color) {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div class="custom-marker-${color}" style="background-color: ${markerColors[color]};"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  }
  
  // Полноэкранная карта
  const fullMap = L.map('fullMap', {
    center: mapCenter,
    zoom: 12,
    scrollWheelZoom: false,  // Отключаем зум колесиком
    doubleClickZoom: false,  // Отключаем зум двойным кликом
    boxZoom: false,          // Отключаем box zoom
    tap: false               // Отключаем тап для мобильных
  });
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ''
  }).addTo(fullMap);
  
  // Добавляем маркеры на карту
  sortingPoints.forEach(point => {
    const marker = L.marker(point.coords, {
      icon: createColoredMarker(point.color)
    }).bindPopup(point.name);
    
    marker.addTo(fullMap);
  });
  
  // Отключаем скролл страницы
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
});
