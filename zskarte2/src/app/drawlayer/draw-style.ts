/*
 * Copyright © 2018 ZSO Bern Plus
 *
 * This file is part of Zivilschutzkarte 2.
 *
 * Zivilschutzkarte 2 is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * Zivilschutzkarte 2 is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Zivilschutzkarte 2.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 */

import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import FillPattern from 'ol-ext/style/FillPattern';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import MultiPoint from 'ol/geom/MultiPoint';
import LineString from 'ol/geom/LineString';
import Circle from 'ol/style/Circle';
import {Md5} from "ts-md5";
import {defineDefaultValuesForSignature, getMostTopCoordinate} from "../entity/sign";
import {CustomImageStoreService} from "../custom-image-store.service";
import ConvexHull from 'ol-ext/geom/ConvexHull';


export class DrawStyle {

    static defaultScaleFactor = 0.2;

    static textScaleFactor = 1;

    filter = null;

    public static getImageUrl(file): string {
        return 'assets/img/signs/' + file;
    }

    private static scale(resolution: number, scaleFactor: number, min: number = 0.1): any {
        return Math.max(min, scaleFactor * Math.sqrt(0.5 * resolution) / resolution);
    }

    private static getDash(lineStyle: string, resolution: number): any {
        if (lineStyle === 'dash') {
            const value = Math.max(30, DrawStyle.scale(resolution, 20));
            return [value, value];
        } else {
            return [0, 0];
        }
    }

    private static getDashOffset(lineStyle: string, resolution: number): any {
        if (lineStyle === 'dash') {
            return Math.max(30, DrawStyle.scale(resolution, 20));
        } else {
            return 0;
        }
    }

    public static styleFunctionSelect(feature, resolution): any {
        if(feature.get("features")){
            if(feature.get("features").length>1) {
                return DrawStyle.clusterStyleFunction(feature, resolution, true);
            }
            else{
                return DrawStyle.styleFunctionSelect(feature.get("features")[0], resolution);
            }
        }
        else {
            if (resolution !== DrawStyle.lastResolution) {
                DrawStyle.lastResolution = resolution;
                DrawStyle.clearCaches();
            }
            // The feature shall not be displayed or is errorenous. Therefore, we return an empty style.
            const signature = feature.get('sig');
            if (!signature) {
                return [];
            } else if (signature.text !== undefined && signature.text !== null) {
                // It's a text-entry...
                return DrawStyle.textStyleFunction(feature, resolution, true);
            } else {
                // It's a symbol-signature.
                return DrawStyle.imageStyleFunction(feature, resolution, signature, true);
            }
        }
    }

    private static getGridDimensions(totalSize: number) {
        return Math.ceil(Math.sqrt(totalSize));
    }

    private static getNumberOfRows(totalSize: number) {
        return Math.ceil(totalSize / DrawStyle.getGridDimensions(totalSize));
    }

    private static getNumberOfInstancesInLastRow(totalSize: number) {
        let numberOfRows = DrawStyle.getNumberOfRows(totalSize)
        let gridDimensions = DrawStyle.getGridDimensions(totalSize);
        let remainder = totalSize % Math.max(1, (numberOfRows-1) * gridDimensions);
        return remainder === 0 ? gridDimensions : remainder;
    }

    private static getIconLocation(index: number, totalSize: number, iconSizeInCoordinates: number) {
        let numberOfRows = DrawStyle.getNumberOfRows(totalSize);
        let gridDimensions = DrawStyle.getGridDimensions(totalSize);
        let row = Math.floor(index / gridDimensions);
        let col = index - (row * gridDimensions)
        let numberOfInstancesInRow = numberOfRows - row - 1 === 0 ? this.getNumberOfInstancesInLastRow(totalSize) : gridDimensions;
        let leftOffset = numberOfInstancesInRow / 2 - col + 0.5
        let topOffset = numberOfRows / 2 - row + 0.5
        return [iconSizeInCoordinates - leftOffset * iconSizeInCoordinates, iconSizeInCoordinates - topOffset * iconSizeInCoordinates];
    }


    public static clusterStyleFunctionDefault(feature, resolution): any {
        if (resolution !== DrawStyle.lastResolution) {
            DrawStyle.lastResolution = resolution;
            DrawStyle.clearCaches();
        }
        return DrawStyle.clusterStyleFunction(feature, resolution, false);
    }

    private static clusterStyleFunction(feature, resolution, selected:boolean): any {
        let coordinateScale = resolution;
        let iconSizeInCoordinates = 50 * coordinateScale;
        const scale = 0.12;
        let features = feature.get("features");
        if (features.length == 1) {
            return DrawStyle.styleFunction(features[0], resolution);
        } else {
            let offset = 0;
            let iconCount = {};
            let pointCoordinates = [];
            features.forEach(f => pointCoordinates.push(f.getGeometry().getCoordinates()));
            let hull = ConvexHull(pointCoordinates);
            let groupedFeatures = {}
            features.forEach(f => {
                let sigSrc = f.get("sig").src;
                if (!groupedFeatures[sigSrc]) {
                    groupedFeatures[sigSrc] = 0;
                }
                groupedFeatures[sigSrc]++;
            })
            let groupedFeatureCount = Object.keys(groupedFeatures).length;
            let clusterCacheHash = DrawStyle.calculateCacheHashForCluster(groupedFeatures, selected);
            let styles = this.clusterStyleCache[clusterCacheHash];
            if(!styles){
                styles = this.clusterStyleCache[clusterCacheHash] = []
                styles.push(new Style({
                    fill: DrawStyle.getAreaFill(DrawStyle.colorFunction(selected ? "#FFFFFF" : "#e5e5e5", 0.8), 1, "filled"),
                    stroke: new Stroke({
                        color: '#3399CC',
                        width: selected ? 2 : 1
                    }),
                    geometry: function (feature) {
                        let gridDimensions = DrawStyle.getGridDimensions(groupedFeatureCount);
                        let bottomLeft = DrawStyle.getIconLocation(0, groupedFeatureCount, iconSizeInCoordinates);
                        let bottomRight = DrawStyle.getIconLocation(gridDimensions-1, groupedFeatureCount, iconSizeInCoordinates);
                        let topLeft = DrawStyle.getIconLocation((DrawStyle.getNumberOfRows(groupedFeatureCount) - 1) * gridDimensions, groupedFeatureCount, iconSizeInCoordinates);
                        let instancesInLastRow = DrawStyle.getNumberOfInstancesInLastRow(groupedFeatureCount);
                        let topRight = DrawStyle.getIconLocation((DrawStyle.getNumberOfRows(groupedFeatureCount) -1) * gridDimensions + instancesInLastRow - 1, groupedFeatureCount, iconSizeInCoordinates);
                        let coordinates = feature.getGeometry().getCoordinates();
                        let paddingFactor = 0.6;
                        return new Polygon([[[coordinates[0] + bottomLeft[0] - iconSizeInCoordinates * paddingFactor+offset, coordinates[1] + bottomLeft[1] - iconSizeInCoordinates * paddingFactor + offset], [coordinates[0] + bottomRight[0] + iconSizeInCoordinates * paddingFactor + offset, coordinates[1] + bottomRight[1] - iconSizeInCoordinates * paddingFactor + offset], [coordinates[0] + topRight[0] + iconSizeInCoordinates * paddingFactor + offset, coordinates[1] + topRight[1] + iconSizeInCoordinates * paddingFactor + offset], [coordinates[0] + topLeft[0] - iconSizeInCoordinates * paddingFactor + offset, coordinates[1] + topLeft[1] + iconSizeInCoordinates * paddingFactor + offset]]]);
                    },
                    zIndex: 3
                }));
                Object.keys(groupedFeatures).forEach((src, index) => {
                    let iconLocation = DrawStyle.getIconLocation(index, groupedFeatureCount, iconSizeInCoordinates);
                    if (iconLocation) {
                        styles.push(new Style({
                            text: new Text({
                                text: groupedFeatures[src].toString(),
                                font: 11 + 'px sans-serif',
                                offsetX: 19,
                                offsetY: -19,
                                fill: DrawStyle.getColorFill("#FFFFFF"),
                                backgroundFill: DrawStyle.getColorFill("#3399CC"),
                                backgroundStroke: DrawStyle.createDefaultStroke(0.12, "#3399CC"),
                                padding: [0, 0, 1, 1]
                            }),
                            zIndex: 5,
                            geometry: function (feature) {
                                let coordinates = feature.getGeometry().getCoordinates();
                                return new Point([coordinates[0] + iconLocation[0]+offset, coordinates[1] + iconLocation[1]+offset]);
                            }
                        }));
                        styles.push(new Style({
                            image: new Circle({
                                radius: 20,
                                fill: DrawStyle.getColorFill("#ffffff"),
                                stroke: new Stroke({
                                    color: '#3399CC'
                                })
                            }),
                            zIndex: 10,
                            geometry: function (feature) {
                                let coordinates = feature.getGeometry().getCoordinates();
                                return new Point([coordinates[0] + iconLocation[0]+offset, coordinates[1] + iconLocation[1]+offset]);
                            }
                        }));
                        let icon = src
                        iconCount[icon] = (iconCount[icon] ? iconCount[icon] : 0) + 1;
                        let imageFromMemory;
                        let scaledSize = undefined;
                        let naturalDim = null;
                        let imageFromMemoryDataUrl = CustomImageStoreService.getImageDataUrl(icon)

                        if (imageFromMemoryDataUrl) {
                            imageFromMemory = new Image();
                            imageFromMemory.src = imageFromMemoryDataUrl;
                            naturalDim = Math.min.apply(null, CustomImageStoreService.getDimensions(icon));
                            scaledSize = 60 / naturalDim;
                        }
                        styles.push(new Style({
                            image: new Icon(({
                                anchor: [0.5, 0.5],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'fraction',
                                scale: 0.25,
                                src: imageFromMemory ? undefined : DrawStyle.getImageUrl(icon),
                                img: imageFromMemory ? imageFromMemory : undefined,
                                imgSize: scaledSize ? [naturalDim, naturalDim] : undefined,
                            })),
                            zIndex: 15,
                            geometry: function (feature) {
                                let coordinates = feature.getGeometry().getCoordinates();
                                return new Point([coordinates[0] + iconLocation[0]+offset, coordinates[1] + iconLocation[1]+offset]);
                            }
                        }));
                    }
                });
                if(selected) {
                    styles.push(new Style({
                        fill: DrawStyle.getAreaFill(DrawStyle.colorFunction("#dedede", 0.6), 1, "filled"),
                        stroke: DrawStyle.createDefaultStroke(scale, "#3399CC", true),
                        geometry: function (feature) {
                            return new Polygon([hull]);
                        }
                    }));
                }
            }
            return styles;
        }
    }


    public static styleFunction(feature, resolution): any {
        if (resolution !== DrawStyle.lastResolution) {
            DrawStyle.lastResolution = resolution;
            DrawStyle.clearCaches();
        }

        // The feature shall not be displayed or is errorenous. Therefore, we return an empty style.
        const signature = feature.get('sig');
        if (!signature) {
            return [];
        } else if (signature.text) {
            // It's a text-entry...
            return DrawStyle.textStyleFunction(feature, resolution, false);
        } else {
            // It's a symbol-signature.
            return DrawStyle.imageStyleFunction(feature, resolution, signature, false);
        }
        // }
    }

    private static symbolStyleCache = {};
    private static vectorStyleCache = {};
    private static imageCache = {};
    private static colorFill = {};
    private static clusterStyleCache = {};

    private static lastResolution = null;

    public static clearCaches() {
        DrawStyle.symbolStyleCache = {};
        DrawStyle.vectorStyleCache = {};
        DrawStyle.colorFill = {};
        DrawStyle.imageCache = {};
        DrawStyle.clusterStyleCache = {}
    }


    private static calculateCacheHashForCluster(groupedFeatures,  selected): string {
        return Md5.hashStr(JSON.stringify({
            groupedFeatures: groupedFeatures,
            selected: selected
        })).toString();
    }


    private static calculateCacheHashForSymbol(signature, feature, resolution, selected): string {
        feature = DrawStyle.getSubfeature(feature);
        return Md5.hashStr(JSON.stringify({
            resolution: resolution,
            rotation: feature.rotation,
            selected: selected,
            signatureColor: signature.color,
            signatureSrc: signature.src,
            type: feature.getGeometry().getType(),
            signaturePayload: signature.dataUrl ? signature.dataUrl.src : null,
            hideIcon: signature.hideIcon,
            iconOffset: signature.iconOffset,
            zindex: this.getZIndex(feature)
        })).toString();
    }

    private static calculateCacheHashForVector(signature, feature, resolution, selected): string {
        feature = DrawStyle.getSubfeature(feature);
        return Md5.hashStr(JSON.stringify({
            color: signature.color,
            selected: selected,
            opacity: signature.fillOpacity,
            resolution: resolution,
            lineStyle: signature.style,
            type: feature.getGeometry().getType(),
            strokeWidth: signature.strokeWidth,
            zindex: this.getZIndex(feature),
            fillStyle: signature.fillStyle ? signature.fillStyle.name : null,
            fillStyleSize: signature.fillStyle ? signature.fillStyle.size : null,
            fillStyleAngle: signature.fillStyle ? signature.fillStyle.angle : null,
            fillStyleSpacing: signature.fillStyle ? signature.fillStyle.spacing : null
        })).toString();
    }


    private static getAnchorCoordinate(feature) {
        feature = DrawStyle.getSubfeature(feature);
        switch (feature.getGeometry().getType()) {
            case "Point":
                return feature.getGeometry().getCoordinates();
        }
        return null;

    }

    private static getIconCoordinates(feature, resolution) {
        feature = DrawStyle.getSubfeature(feature);
        let signature = feature.get('sig');
        let symbolAnchorCoordinate = getMostTopCoordinate(feature);
        let offset = signature.iconOffset;
        let resolutionFactor = resolution / 10;
        let symbolCoordinate = [signature.flipIcon ? symbolAnchorCoordinate[0] + offset * resolutionFactor : symbolAnchorCoordinate[0] - offset * resolutionFactor, symbolAnchorCoordinate[1] + offset * resolutionFactor];
        return [symbolAnchorCoordinate, symbolCoordinate]
    }

    private static createLineToIcon(feature, resolution) {
        feature = DrawStyle.getSubfeature(feature);
        let iconCoordinates = DrawStyle.getIconCoordinates(feature, resolution);
        let symbolAnchorCoordinate = iconCoordinates[0];
        let symbolCoordinate = iconCoordinates[1];
        return new LineString([symbolCoordinate, [(symbolCoordinate[0] + symbolAnchorCoordinate[0] * 2) / 3, (symbolCoordinate[1] + symbolAnchorCoordinate[1]) / 2], symbolAnchorCoordinate]);
    }

    private static getColorFill(color) {
        let result = this.colorFill[color];
        if (!result) {
            result = this.colorFill[color] = new Fill({
                color: color
            });
        }
        return result;
    }

    private static showIcon(signature) {
        return !signature.hideIcon && signature.src;
    }

    private static createDefaultStroke(scale, color, dashed = false) {
        let strokeWidth = scale * 10;
        let stroke = new Stroke({
            color: DrawStyle.colorFunction(color, 1.0),
            width: strokeWidth
        });
        if (dashed) {
            stroke.setLineDash([strokeWidth * 2, strokeWidth * 2]);
            stroke.setLineDashOffset(strokeWidth * 2);
        }
        return stroke;
    }

    private static getSubfeature(feature) {
        let subfeature = feature.get('features');
        if (subfeature && subfeature.length == 1) {
            return subfeature[0];
        }
        return feature;
    }


    private static getIconStyle(feature, resolution, signature, selected, scale): Style[] {
        feature = DrawStyle.getSubfeature(feature);
        const zIndex = selected ? Infinity : this.getZIndex(feature)
        const symbolCacheHash = DrawStyle.calculateCacheHashForSymbol(signature, feature, resolution, selected);
        let iconStyles = this.symbolStyleCache[symbolCacheHash];
        let featureId = feature.ol_uid;
        if (!iconStyles && (signature.src || signature.dataUrl) && feature.getGeometry()) {
            iconStyles = this.symbolStyleCache[symbolCacheHash] = []
            let showIcon = this.showIcon(signature);
            let dashedStroke = this.createDefaultStroke(scale, signature.color, true);
            const iconRadius = scale * 250;
            const highlightStroke = selected ? DrawStyle.getHighlightStroke(feature, scale) : null;
            if (showIcon && selected) {
                //Highlight the stroke to the icon
                iconStyles.push(new Style({
                    stroke: highlightStroke,
                    geometry: function (feature) {
                        return DrawStyle.createLineToIcon(feature, resolution)
                    },
                    zIndex: zIndex
                }));
                iconStyles.push(new Style({
                    image: new Circle({
                        radius: iconRadius,
                        stroke: highlightStroke
                    }),
                    geometry: function (feature) {
                        return new Point(DrawStyle.getIconCoordinates(feature, resolution)[1]);

                    },
                    zIndex: zIndex
                }));
            }

            //Draw a circle if it is a geometry with a clear anchor coordinate (e.g. a "point")
            if (feature.getGeometry().getType() === "Point") {
                iconStyles.push(new Style({
                    image: new Circle({
                        radius: scale * 50,
                        fill: this.getColorFill(signature.color),
                        stroke: highlightStroke
                    }),
                    geometry: function (feature) {
                        return new Point(DrawStyle.getAnchorCoordinate(feature));
                    },
                    zIndex: zIndex
                }))
            }

            if (showIcon) {
                //Draw a dashed line to the icon
                iconStyles.push(new Style({
                    stroke: dashedStroke,
                    geometry: function (feature) {
                        return DrawStyle.createLineToIcon(feature, resolution)
                    },
                    zIndex: zIndex
                }));

                //Draw a circle below the icon
                iconStyles.push(new Style({
                    image: new Circle({
                        radius: scale * 250,
                        fill: this.getColorFill("#FFFFFF"),
                        stroke: dashedStroke
                    }),
                    geometry: function (feature) {
                        return new Point(DrawStyle.getIconCoordinates(feature, resolution)[1]);
                    },
                    zIndex: zIndex
                }));

                let imageFromMemory;
                let scaledSize = undefined;
                let naturalDim = null;
                let imageFromMemoryDataUrl = CustomImageStoreService.getImageDataUrl(signature.src)
                if (imageFromMemoryDataUrl) {
                    imageFromMemory = this.imageCache[featureId]
                    if (!imageFromMemory) {
                        imageFromMemory = this.imageCache[featureId] = new Image();
                    }
                    imageFromMemory.src = imageFromMemoryDataUrl;
                    naturalDim = Math.min.apply(null, CustomImageStoreService.getDimensions(signature.src))
                    scaledSize = 492 / naturalDim * scale;
                }
                let icon = new Icon(({
                    anchor: [0.5, 0.5],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    scale: scaledSize ? scaledSize : scale * 2.5,
                    opacity: 1,
                    rotation: feature.rotation !== undefined ? feature.rotation * Math.PI / 180 : 0,
                    src: imageFromMemory ? undefined : this.getImageUrl(signature.src),
                    img: imageFromMemory ? imageFromMemory : undefined,
                    imgSize: scaledSize ? [naturalDim, naturalDim] : undefined
                }))

                //Draw the icon
                iconStyles.push(new Style({
                    image: icon,
                    geometry: function (feature) {
                        return new Point(DrawStyle.getIconCoordinates(feature, resolution)[1]);
                    },
                    zIndex: zIndex
                }));
            }
        }
        return iconStyles;
    }

    private static getZIndex(feature) {
        feature = DrawStyle.getSubfeature(feature);
        return feature.get('zindex') ? feature.get('zindex') : 0
    }

    private static getAreaFill(color, scale, fillStyle) {
        if (fillStyle && fillStyle.name && fillStyle.name != "filled") {
            return new FillPattern({
                pattern: fillStyle.name,
                ratio: 1,
                color: color,
                offset: 0,
                scale: scale * 10,
                size: fillStyle.size,
                spacing: fillStyle.spacing,
                angle: fillStyle.angle
            })
        } else {
            return this.getColorFill(color);
        }
    }

    private static getVectorStyles(feature, resolution, signature, selected, scale): Style {
        feature = DrawStyle.getSubfeature(feature);
        const vectorCacheHash = DrawStyle.calculateCacheHashForVector(signature, feature, resolution, selected);
        let vectorStyle = this.vectorStyleCache[vectorCacheHash];
        if (!vectorStyle) {
            vectorStyle = this.vectorStyleCache[vectorCacheHash] = [];
            const zIndex = this.getZIndex(feature)
            if (selected) {
                let highlightStyle = this.getHighlightLineWhenSelectedStyle(feature, scale, selected);
                if (highlightStyle) {
                    vectorStyle.push(highlightStyle)
                }
            }
            vectorStyle.push(new Style({
                stroke: new Stroke({
                    color: DrawStyle.colorFunction(signature.color, 1.0),
                    width: this.calculateStrokeWidth(scale, signature),
                    lineDash: DrawStyle.getDash(signature.style, resolution),
                    lineDashOffset: DrawStyle.getDashOffset(signature.style, resolution)
                }),
                fill: this.getAreaFill(DrawStyle.colorFunction(signature.color, signature.fillOpacity), scale, signature.fillStyle),
                zIndex: zIndex
            }));
            if (selected) {
                let highlightedPointsStyle = this.getHighlightPointsWhenSelectedStyle(feature, scale, selected);
                if (highlightedPointsStyle) {
                    vectorStyle.push(highlightedPointsStyle);
                }
            }
        }
        return vectorStyle;
    }

    private static calculateStrokeWidth(scale, signature) {
        return scale * 20 * signature.strokeWidth;
    }


    private static getHighlightStroke(feature, scale) {
        feature = DrawStyle.getSubfeature(feature);
        return new Stroke({
            color: "#fff5cb",
            width: this.calculateStrokeWidth(scale, feature.get('sig')) + scale * 30,
        });
    }


    private static getHighlightLineWhenSelectedStyle(feature, scale, selected): Style {
        feature = DrawStyle.getSubfeature(feature);
        if (selected) {
            switch (feature.getGeometry().getType()) {
                case "Polygon":
                case "MultiPolygon":
                case "LineString":
                    return new Style({
                        stroke: DrawStyle.getHighlightStroke(feature, scale)
                    });
            }
        }
        return null;
    }


    private static getHighlightPointsWhenSelectedStyle(feature, scale, selected)
        :
        Style {
        if (selected) {
            let coordinatesFunction = null;
            switch (feature.getGeometry().getType()) {
                case "Polygon":
                case "MultiPolygon":
                    coordinatesFunction = function (feature) {
                        let coordinates = [];
                        for (let c of feature.getGeometry().getCoordinates()) {
                            c.forEach(coord => coordinates.push(coord));
                        }
                        return coordinates;
                    }
                    break;
                case "LineString":
                    coordinatesFunction = function (feature) {
                        return feature.getGeometry().getCoordinates();
                    }
                    break;
            }
            if (coordinatesFunction) {
                return new Style({
                    image: new Circle({
                        radius: scale * 20,
                        fill: new Fill({
                            color: 'orange'
                        })
                    }),
                    geometry: function (feature) {
                        return new MultiPoint(coordinatesFunction(feature));
                    },
                    zIndex: selected ? Infinity : this.getZIndex(feature)
                })
            }
        }
        return null;
    }

    private static imageStyleFunction(feature, resolution, signature, selected): any {
        defineDefaultValuesForSignature(signature);
        let scale = DrawStyle.scale(resolution, DrawStyle.defaultScaleFactor);
        let vectorStyles = this.getVectorStyles(feature, resolution, signature, selected, scale);
        let iconStyles = this.getIconStyle(feature, resolution, signature, selected, scale);
        let styles = [];
        if (iconStyles) {
            iconStyles.forEach(i => styles.push(i));
        }
        if (vectorStyles) {
            vectorStyles.forEach(v => styles.push(v));
        }
        return styles;
    }

    private static textStyleFunction(feature, resolution, selected) {
        let defaultScale = DrawStyle.scale(resolution, DrawStyle.defaultScaleFactor);
        let signature = feature.get('sig');
        defineDefaultValuesForSignature(signature);
        let zIndex = selected ? Infinity : this.getZIndex(feature);
        let textStyles = [new Style({
            stroke: this.createDefaultStroke(defaultScale, signature.color, true),
            zIndex: zIndex
        }), new Style({
            text: new Text({
                text: signature.text,
                backgroundFill: this.getColorFill("#FFFFFF"),
                font: signature.fontSize * 30 + 'px sans-serif',
                rotation: feature.rotation !== undefined ? feature.rotation * Math.PI / 180 : 0,
                scale: DrawStyle.scale(resolution, DrawStyle.textScaleFactor, 0.4),
                fill: this.getColorFill(signature.color),
                backgroundStroke: this.createDefaultStroke(defaultScale, signature.color),
                padding: [5, 5, 5, 5]
            }),
            geometry: function (feature) {
                return new Point(feature.getGeometry().getCoordinates()[feature.getGeometry().getCoordinates().length - 1])
            },
            zIndex: zIndex
        }), new Style({
            image: new Circle({
                radius: defaultScale * 50,
                fill: this.getColorFill(signature.color),
            }),
            geometry: function (feature) {
                return new Point(feature.getGeometry().getCoordinates()[0])
            },
            zIndex: zIndex
        })
        ]

        let highlightLine = this.getHighlightLineWhenSelectedStyle(feature, defaultScale, selected);
        if (highlightLine) {
            textStyles.push(highlightLine);
        }
        let highlightPoints = this.getHighlightPointsWhenSelectedStyle(feature, defaultScale, selected)
        if (highlightPoints) {
            textStyles.push(highlightPoints);
        }
        return textStyles;
    }

    private static colorFunction = function (signatureColor, alpha) {
        if (signatureColor) {
            let hexAlpha = (Math.floor(255 * (alpha !== undefined ? alpha : 1))).toString(16);
            if (hexAlpha.length == 1) {
                hexAlpha = "0" + hexAlpha;
            }
            return signatureColor + hexAlpha;
        }
        return 'rgba(121, 153, 242, ' + (alpha !== undefined ? alpha : '1') + ')';
    };

}
