import EditablePolygon from "./editable-polygon.js";
import EditableLine from "./editable-line.js";
import EditablePoint from "./editable-point.js";

export default class EditableGeoObjectFactory {
  create(yandexMap, geoObjectOptions) {
    switch (geoObjectOptions.type) {
      case 'POLYGON':
        return new EditablePolygon(yandexMap, geoObjectOptions);
      case 'LINE':
        return new EditableLine(yandexMap, geoObjectOptions);
      case 'POINT':
        return new EditablePoint(yandexMap, geoObjectOptions);
      default:
        throw new Error(`${geoObjectOptions.type} is not supported`);
    }
  }
}
