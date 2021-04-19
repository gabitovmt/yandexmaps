export default function editableLine(geoObjectOptions) {
  const o = geoObjectOptions;

  return new ymaps.Polyline([], {}, {
    draggable: true,
    editorDrawingCursor: 'crosshair',
    strokeColor: o.color,
    strokeWidth: 5,
    opacity: o.opacity,
    zIndex: o.zIndex,
  });
}
