import EditablePolygon from "./editable-polygon.js";
import EditableLine from "./editable-line.js";
import EditablePoint from "./editable-point.js";
import EditableArrow from "./editable-arrow.js";

export default class EditableGeoObjectFactory {
  create(yandexMap, coordinates, geoObjectOptions) {
    const constructor = this._editableGeoObjectConstructor(geoObjectOptions.type);

    return new constructor(yandexMap, coordinates, geoObjectOptions);
  }
  _editableGeoObjectConstructor(type) {
    switch (type) {
      case 'POLYGON':
        return EditablePolygon;
      case 'LINE':
        return EditableLine;
      case 'POINT':
        return EditablePoint;
      case 'ARROW':
        return EditableArrow;
      default:
        throw new Error(`${type} is not supported`);
    }
  }
}
