ymaps.ready(function () {
  // Указывается идентификатор HTML-элемента.
  const moscowMap = new ymaps.Map("first-map", {
    center: [55.76, 37.64],
    zoom: 10
  });

  // Удаление карты
  document.getElementById('first-map__destroy-btn')
    .addEventListener('click', () => {
      moscowMap.destroy();
    });

  // Ссылка на элемент.
  const piterMap = new ymaps.Map(document.getElementsByClassName('second-map')[0], {
    center: [59.94, 30.32],
    zoom: 9
  });

  // Удаление карты
  document.getElementById('second-map__destroy-btn')
    .addEventListener('click', () => {
      piterMap.destroy();
    });
});
