import EditableGeoObject from "./editable-geo-object.js";

export default class EditablePolygon extends EditableGeoObject{
  constructor(yandexMap, coordinates, geoObjectOptions) {
    super(yandexMap, coordinates, geoObjectOptions);
  }

  get coordinates() {
    return this._geoObject.geometry.getCoordinates()[0];
  }

  _newGeoObject() {
    const o = this._geoObjectOptions;
    const coordinates = this._coordinates.length > 0 ? [this._coordinates] : [];

    return new ymaps.Polygon(coordinates, {}, {
      editorDrawingCursor: 'crosshair',
      // Контекстное меню вершины
      editorMenuManager(editorItems) {
        // Удаляем пункт "Добавить внутренний контур"
        return editorItems.filter(item => item.id !== 'addInterior');
      },
      fillColor: o.color,
      strokeColor: o.color,
      strokeWidth: 5,
      opacity: o.opacity,
      zIndex: o.zIndex
    });
  }
}
