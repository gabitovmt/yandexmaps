export default function editablePolygon(geoObjectOptions) {
  const o = geoObjectOptions;

  return new ymaps.Polygon([], {}, {
    draggable: true,
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
