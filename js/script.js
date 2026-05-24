// Инициализация карт при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Координаты для карты (Санкт-Петербург)
  const mapCenter = [59.934280, 30.335099];
  
  // Данные о пунктах сортировки с типами
  const sortingPoints = [
    { coords: [59.934280, 30.335099], type: 'plastic', name: 'Пункт пластика на Невском' },
    { coords: [59.938636, 30.322470], type: 'paper', name: 'Бумага на Васильевском' },
    { coords: [59.920724, 30.315367], type: 'glass', name: 'Стекло у метро Пушкинская' },
    { coords: [59.950000, 30.350000], type: 'metal', name: 'Металл на Петроградской' },
    { coords: [59.910000, 30.300000], type: 'organic', name: 'Органика в центре' },
    { coords: [59.945000, 30.380000], type: 'plastic', name: 'Пластик на Лиговском' },
    { coords: [59.925000, 30.340000], type: 'paper', name: 'Бумага у Спасской' }
  ];
  
  // Цвета для типов отходов
  const typeColors = {
    plastic: '#ff7e52',
    paper: '#BDBDBD',
    glass: '#769ff3',
    metal: '#fbbf49',
    organic: '#0ba452'
  };
  
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
  sortingPoints.forEach(point => {
    L.marker(point.coords).addTo(miniMap);
  });
  
  // Полноэкранная карта в модальном окне
  let fullMap = null;
  const markersByType = {};
  
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
      
      // Создаем маркеры по типам
      sortingPoints.forEach(point => {
        if (!markersByType[point.type]) {
          markersByType[point.type] = [];
        }
        
        const marker = L.marker(point.coords)
          .bindPopup(point.name);
        markersByType[point.type].push(marker);
      });
      
      // Обработчики кнопок фильтров
      const filterBtns = document.querySelectorAll('.filter-btn');
      
      // Функция для обновления видимости маркеров
      function updateMarkersVisibility() {
        // Скрываем все маркеры
        Object.keys(markersByType).forEach(type => {
          markersByType[type].forEach(marker => fullMap.removeLayer(marker));
        });
        
        // Показываем только маркеры активных типов
        filterBtns.forEach(btn => {
          if (btn.classList.contains('active')) {
            const type = btn.dataset.type;
            if (markersByType[type]) {
              markersByType[type].forEach(marker => marker.addTo(fullMap));
            }
          }
        });
      }
      
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          this.classList.toggle('active');
          updateMarkersVisibility();
        });
      });
      
      // Активируем по умолчанию только кнопку ПЛАСТИК
      const plasticBtn = document.querySelector('.filter-btn[data-type="plastic"]');
      if (plasticBtn) {
        plasticBtn.classList.add('active');
      }
      
      // Отображаем только маркеры пластика
      updateMarkersVisibility();
      
      // Поиск по карте
      const searchInput = document.querySelector('.map-search');
      searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        sortingPoints.forEach((point, index) => {
          const marker = markersByType[point.type]?.[index];
          if (!marker) return;
          
          if (query === '' || point.name.toLowerCase().includes(query)) {
            if (!fullMap.hasLayer(marker)) {
              marker.addTo(fullMap);
            }
          } else {
            fullMap.removeLayer(marker);
          }
        });
      });
    } else {
      // Обновляем размер карты после показа
      setTimeout(() => {
        fullMap.invalidateSize();
      }, 100);
    }
  });
  
  // Сброс фильтров при закрытии модального окна
  document.getElementById('mapModal').addEventListener('hidden.bs.modal', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
    });
    
    const searchInput = document.querySelector('.map-search');
    if (searchInput) {
      searchInput.value = '';
    }
  });
});
