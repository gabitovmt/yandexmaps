export default class IEditableGeoObject {
  stopDrawing() {
    throw new Error('method must be overridden');
  }
}
