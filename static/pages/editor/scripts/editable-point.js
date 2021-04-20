import EditableGeoObject from "./editable-geo-object.js";
import Utils from "./utils.js";

// Размер иконок в пикселях
const size = 20;
const halfSize = Utils.round(size / 2, 4);

// Координаты пятиконечной звезды
const starPoints = [
  [0, -0.5],
  [0.1117, -0.1537],
  [0.4755, -0.1545],
  [0.1807, 0.0587],
  [0.2939, 0.4045],
  [0, 0.19],
  [-0.2939, 0.4045],
  [-0.1807, 0.0587],
  [-0.4755, -0.1545],
  [-0.1117, -0.1537]
];

export default class EditablePoint extends EditableGeoObject {
  constructor(yandexMap, coordinates, geoObjectOptions) {
    super(yandexMap, coordinates, geoObjectOptions);
  }

  get coordinates() {
    const coordinates = this._geoObject.geometry.getCoordinates();

    return coordinates != null ? [coordinates] : [];
  }

  _newGeoObject() {
    const o = this._geoObjectOptions;

    const geometry = {
      type: 'Point'
    };
    this._coordinates.length > 0 && (geometry.coordinates = this._coordinates[0]);

    return new ymaps.GeoObject({
      geometry,
      properties: {}
    }, {
      editorDrawingCursor: 'crosshair',
      iconColor: o.color,
      iconLayout: this._iconLayout(),
      iconShape: this._iconShape(),
      opacity: o.opacity,
      zIndex: o.zIndex
    });
  }

  _iconLayout() {
    const svgFactory = {
      'STAR': this._starSVG,
      'CIRCLE': this._circleSVG,
      'SQUARE': this._squareSVG,
      'TRIANGLE': this._triangleSVG,
      'RHOMBUS': this._rhombusSVG
    }
    const svg = svgFactory[this._geoObjectOptions.typePoint].call(this);

    return ymaps.templateLayoutFactory.createClass(svg);
  }

  _starSVG() {
    const o = this._geoObjectOptions;
    const points = starPoints
      .map(([x, y]) => [x + 0.5, y + 0.5])
      .map(point => point.map(c => Utils.round(c, 4)))
      .map(point => point.join(' '))
      .join(', ');
    const content = `<polygon points="${points}" fill="${o.color}" />`;

    return this._svg(content);
  }

  _circleSVG() {
    const o = this._geoObjectOptions;
    const content = `<circle cx="0.5" cy="0.5" r="0.5" fill="${o.color}" />`;

    return this._svg(content);
  }

  _squareSVG() {
    const o = this._geoObjectOptions;
    const content = `<rect x="0" y="0" width="1" height="1" fill="${o.color}" />`;

    return this._svg(content);
  }

  _triangleSVG() {
    const o = this._geoObjectOptions;
    const content = `<polygon points="0 1, 0.5 0, 1 1" fill="${o.color}" />`;

    return this._svg(content);
  }

  _rhombusSVG() {
    const o = this._geoObjectOptions;
    const content = `<polygon points="0 0.5, 0.5 0, 1 0.5, 0.5 1" fill="${o.color}" />`;

    return this._svg(content);
  }

  _svg(content) {
    const o = this._geoObjectOptions;

    return `<svg \
width="${size}" height="${size}" \
style="opacity: ${o.opacity}; position: absolute; left: ${-halfSize}px; top: ${-halfSize}px" \
viewBox="0 0 1 1" \
version="1.1" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
  }

  _iconShape() {
    const shapeFactory = {
      'STAR': this._starShape,
      'CIRCLE': this._circleShape,
      'SQUARE': this._squareShape,
      'TRIANGLE': this._triangleShape,
      'RHOMBUS': this._rhombusShape
    }

    return shapeFactory[this._geoObjectOptions.typePoint].call(this);
  }

  _starShape() {
    return {
      type: 'Polygon',
      coordinates: [
        starPoints.map(point => point.map(c => Utils.round(c * size, 4)))
      ]
    }
  }

  _circleShape() {
    return {
      type: 'Circle',
      coordinates: [0, 0],
      radius: halfSize
    }
  }

  _squareShape() {
    return {
      type: 'Rectangle',
      coordinates: [[-halfSize, -halfSize], [halfSize, halfSize]]
    }
  }

  _triangleShape() {
    return {
      type: 'Polygon',
      coordinates: [[
        [0, -halfSize], [halfSize, halfSize], [-halfSize, halfSize]
      ]]
    }
  }

  _rhombusShape() {
    return {
      type: 'Polygon',
      coordinates: [[
        [0, halfSize], [halfSize, 0], [0, -halfSize], [-halfSize, 0]
      ]]
    }
  }
}
