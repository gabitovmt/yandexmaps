export default class IEditableGeoObject {
  startDrawing() {
    throw new Error('method must be overridden');
  }

  stopDrawing() {
    throw new Error('method must be overridden');
  }

  get coordinates() {
    throw new Error('method must be overridden');
  }

  get geoObjectOptions() {
    throw new Error('method must be overridden');
  }
}
