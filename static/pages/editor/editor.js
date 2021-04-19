import GeoObjectOptions from "./scripts/geo-object-options.js";
import EditableGeoObjectFactory from "./scripts/editable-geo-object-factory.js";

class ControlPanelForm {
  constructor(idForm, yandexMap) {
    this._form = document.getElementById(idForm);
    this._yandexMap = yandexMap;
    this._editableGeoObject = null;

    this._startDrawingBtnCallback = this._startDrawingBtnCallback.bind(this);
    this._stopDrawingBtnCallback = this._stopDrawingBtnCallback.bind(this);

    this._startDrawingBtn.addEventListener('click', this._startDrawingBtnCallback);
    this._stopDrawingBtn.addEventListener('click', this._stopDrawingBtnCallback);
  }

  get _startDrawingBtn() {
    return this._form.elements['start-drawing-btn'];
  }

  get _stopDrawingBtn() {
    return this._form.elements['stop-drawing-btn'];
  }

  set _isDrawing(value) {
    this._startDrawingBtn.disabled = value;
    this._stopDrawingBtn.disabled = !value;
  }

  get _geoObjectOptions() {
    const form = this._form;

    const type = form.elements.type.value;
    const color = form.elements.color.value.toUpperCase();
    const level = +form.elements.level.value;
    const transparency = +form.elements.transparency.value;
    const opacity = 1 - transparency / 100;
    const roundOpacity = +(opacity).toFixed(2); // Округляем до двух знаков после запятой

    return new GeoObjectOptions({
      type,
      color,
      opacity: roundOpacity,
      zIndex: level
    });
  }

  _startDrawingBtnCallback(event) {
    event.preventDefault();

    if (!this._form.checkValidity()) {
      alert('Форма заполнена некорректно');
      return;
    }

    this._isDrawing = true;

    const factory = new EditableGeoObjectFactory();
    this._editableGeoObject = factory.create(this._yandexMap, this._geoObjectOptions);
  }

  _stopDrawingBtnCallback() {
    this._isDrawing = false;

    this._editableGeoObject.stopDrawing();
  }
}

ymaps.ready(function () {
  const map = new ymaps.Map('map', {
    center: [58.01, 56.25],
    zoom: 7,
    controls: []
  });

  new ControlPanelForm('control-panel-form', map);
});
