import GeoObjectOptions from "./scripts/geo-object-options.js";
import EditableGeoObjectFactory from "./scripts/editable-geo-object-factory.js";
import Utils from "./scripts/utils.js";

class ControlPanelForm {
  constructor(idForm, yandexMap) {
    this._form = document.getElementById(idForm);
    this._yandexMap = yandexMap;
    this._editableGeoObject = null;
    this._objects = [];

    this._startDrawingBtnCallback = this._startDrawingBtnCallback.bind(this);
    this._stopDrawingBtnCallback = this._stopDrawingBtnCallback.bind(this);
    this._clearMapBtnCallback = this._clearMapBtnCallback.bind(this);
    this._saveObjectsBtnCallback = this._saveObjectsBtnCallback.bind(this);

    this._startDrawingBtn.addEventListener('click', this._startDrawingBtnCallback);
    this._stopDrawingBtn.addEventListener('click', this._stopDrawingBtnCallback);
    this._clearMapBtn.addEventListener('click', this._clearMapBtnCallback);
    this._saveObjectsBtn.addEventListener('click', this._saveObjectsBtnCallback);
  }

  get _startDrawingBtn() {
    return this._form.elements['start-drawing-btn'];
  }

  get _stopDrawingBtn() {
    return this._form.elements['stop-drawing-btn'];
  }

  get _clearMapBtn() {
    return this._form.elements['clear-map-btn'];
  }

  get _saveObjectsBtn() {
    return this._form.elements['save-objects-btn'];
  }

  set _isDrawing(value) {
    this._startDrawingBtn.disabled = value;
    this._stopDrawingBtn.disabled = !value;
    this._clearMapBtn.disabled = value;
    this._saveObjectsBtn.disabled = value;
  }

  get _geoObjectOptions() {
    const form = this._form;

    const type = form.elements.type.value;
    const typePoint = form.elements['type-point'].value;
    const color = form.elements.color.value.toUpperCase();
    const level = +form.elements.level.value;
    const transparency = +form.elements.transparency.value;
    const opacity = Utils.round(1 - transparency / 100, 2);

    return new GeoObjectOptions({
      type,
      typePoint,
      color,
      opacity,
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
    this._editableGeoObject.startDrawing();
  }

  _stopDrawingBtnCallback() {
    this._isDrawing = false;

    this._editableGeoObject.stopDrawing();
    this._editableGeoObject.coordinates.length > 0 && this._objects.push(this._editableGeoObject);
  }

  _clearMapBtnCallback() {
    this._yandexMap.geoObjects.removeAll();
    this._objects = [];
  }

  _saveObjectsBtnCallback() {
    const objects = this._objects.map(editableGeoObject => ({
      coordinates: editableGeoObject.coordinates,
      geoObjectOptions: editableGeoObject.geoObjectOptions
    }));

    localStorage.setItem('objects', JSON.stringify(objects));
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
