// PRELOAD SCRIPT
document.addEventListener('DOMContentLoaded', function () {
  const preloadContainer = document.querySelector('.preload-container');

  // Проверяем, была ли уже показана прелоадер-страница
  const hasSeenPreload = sessionStorage.getItem('hasSeenPreload');

  if (hasSeenPreload) {
    // Если пользователь уже видел прелоадер, скрываем его сразу
    preloadContainer.classList.add('hidden');
  } else {
    // Помечаем, что пользователь увидел прелоадер
    sessionStorage.setItem('hasSeenPreload', 'true');

    // Показываем прелоадер в течение 5 секунд
    setTimeout(function () {
      preloadContainer.classList.add('hidden');
    }, 5000);
  }
});
