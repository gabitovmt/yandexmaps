export default class MyMap {
  constructor() {
    this._mapPromise = new Promise((resolve) => {
      function init() {
        resolve(new ymaps.Map('map', {
          center: [58.01, 56.25],
          zoom: 7
        }));
      }

      window.ymaps.ready(init);
    });
  }

  ready(func) {
    (async () => {
      const map = await this._mapPromise;
      func(map);
    })()
  }
}
