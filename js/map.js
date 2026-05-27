// Инициализация карты с цветными маркерами и поп-апами
document.addEventListener('DOMContentLoaded', function() {
  // Координаты для карты (Санкт-Петербург)
  const mapCenter = [59.934280, 30.335099];
  
  // Данные о пунктах сортировки с цветами (красный, желтый, зеленый)
  const sortingPoints = [
    { coords: [59.934280, 30.335099], color: 'red', name: 'Красная метка - Невский', id: '0212' },
    { coords: [59.938636, 30.322470], color: 'yellow', name: 'Желтая метка - Васильевский', id: '0345' },
    { coords: [59.920724, 30.315367], color: 'green', name: 'Зеленая метка - Пушкинская', id: '0178' },
    { coords: [59.950000, 30.350000], color: 'red', name: 'Красная метка - Петроградская', id: '0456' },
    { coords: [59.910000, 30.300000], color: 'yellow', name: 'Желтая метка - Центр', id: '0289' },
    { coords: [59.945000, 30.380000], color: 'green', name: 'Зеленая метка - Лиговский', id: '0534' },
    { coords: [59.925000, 30.340000], color: 'red', name: 'Красная метка - Спасская', id: '0621' },
    { coords: [59.932000, 30.328000], color: 'yellow', name: 'Желтая метка - Сенная', id: '0147' },
    { coords: [59.940000, 30.345000], color: 'green', name: 'Зеленая метка - Чернышевская', id: '0398' }
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
  
  // Элементы поп-апов для красных меток
  const popupCardRed = document.getElementById('popupCardRed');
  const popupCloseRed = document.getElementById('popupCloseRed');
  const cleanBtnRed = document.getElementById('cleanBtnRed');
  const pointNumberRedSpan = document.getElementById('pointNumberRed');
  
  // Элементы поп-апов для желтых меток
  const popupCardYellow = document.getElementById('popupCardYellow');
  const popupCloseYellow = document.getElementById('popupCloseYellow');
  const cleanBtnYellow = document.getElementById('cleanBtnYellow');
  const pointNumberYellowSpan = document.getElementById('pointNumberYellow');
  
  // Элементы поп-апа фотоотчета
  const reportCard = document.getElementById('reportCard');
  const popupOverlay = document.getElementById('popupOverlay');
  const reportClose = document.getElementById('reportClose');
  const submitReport = document.getElementById('submitReport');
  const photoUpload = document.getElementById('photoUpload');
  
  // Функция открытия поп-апа карточки для красной метки
  function openPopupCardRed(pointId) {
    pointNumberRedSpan.textContent = pointId;
    popupCardRed.classList.remove('hidden');
    popupOverlay.classList.remove('hidden');
  }
  
  // Функция закрытия поп-апа карточки для красной метки
  function closePopupCardRed() {
    popupCardRed.classList.add('hidden');
    popupOverlay.classList.add('hidden');
  }
  
  // Функция открытия поп-апа карточки для желтой метки
  function openPopupCardYellow(pointId) {
    pointNumberYellowSpan.textContent = pointId;
    popupCardYellow.classList.remove('hidden');
    popupOverlay.classList.remove('hidden');
  }
  
  // Функция закрытия поп-апа карточки для желтой метки
  function closePopupCardYellow() {
    popupCardYellow.classList.add('hidden');
    popupOverlay.classList.add('hidden');
  }
  
  // Функция открытия поп-апа фотоотчета
  function openReportCard() {
    popupCardRed.classList.add('hidden');
    popupCardYellow.classList.add('hidden');
    reportCard.classList.remove('hidden');
  }
  
  // Функция закрытия поп-апа фотоотчета
  function closeReportCard() {
    reportCard.classList.add('hidden');
    popupOverlay.classList.add('hidden');
  }
  
  // Функция закрытия всех поп-апов
  function closeAllPopups() {
    closePopupCardRed();
    closePopupCardYellow();
    closeReportCard();
  }
  
  // Обработчики событий для поп-апов красных меток
  popupCloseRed.addEventListener('click', closePopupCardRed);
  cleanBtnRed.addEventListener('click', openReportCard);
  
  // Обработчики событий для поп-апов желтых меток
  popupCloseYellow.addEventListener('click', closePopupCardYellow);
  cleanBtnYellow.addEventListener('click', openReportCard);
  
  // Обработчики событий для поп-апа фотоотчета
  reportClose.addEventListener('click', closeReportCard);
  popupOverlay.addEventListener('click', closeAllPopups);
  
  submitReport.addEventListener('click', function() {
    if (photoUpload.files && photoUpload.files[0]) {
      alert('Фотоотчет успешно отправлен! Спасибо за уборку!');
      closeAllPopups();
    } else {
      alert('Пожалуйста, сделайте фото перед отправкой отчета.');
    }
  });
  
  // Добавляем маркеры на карту
  sortingPoints.forEach(point => {
    const marker = L.marker(point.coords, {
      icon: createColoredMarker(point.color)
    });
    
    // Добавляем обработчик клика для красных меток
    if (point.color === 'red') {
      marker.on('click', function() {
        openPopupCardRed(point.id);
      });
    } 
    // Добавляем обработчик клика для желтых меток
    else if (point.color === 'yellow') {
      marker.on('click', function() {
        openPopupCardYellow(point.id);
      });
    } else {
      // Для зеленых меток просто показываем название
      marker.bindPopup(point.name);
    }
    
    marker.addTo(fullMap);
  });
  
  // Отключаем скролл страницы
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
});
