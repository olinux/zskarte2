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
import MultiPoint from 'ol/geom/MultiPoint';
import LineString from 'ol/geom/LineString';
import Circle from 'ol/style/Circle';
import {Md5} from "ts-md5";
import {defineDefaultValuesForSignature, getMostTopCoordinate} from "../entity/sign";
import {CustomImageStoreService} from "../custom-image-store.service";


// This is a helper class which involves the definitions of stylings used to draw on the map
export class DrawStyle {

    static defaultScaleFactor = 0.2;

    static textScaleFactor = 1;

    filter = null;

    public static getImageUrl(file): string {
        return 'assets/img/signs/' + file;
    }

    private static scale(resolution: number, scaleFactor: number, min: number = 0.12): any {
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
        if(resolution!==DrawStyle.lastResolution){
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


    public static styleFunction(feature, resolution): any {
        if(resolution!==DrawStyle.lastResolution){
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

    private static symbolStyleCache={};
    private static vectorStyleCache={};
    private static imageCache={};
    private static colorFill={};

    private static lastResolution=null;

    public static clearCaches(){
        DrawStyle.symbolStyleCache = {};
        DrawStyle.vectorStyleCache = {};
        DrawStyle.colorFill = {};
        DrawStyle.imageCache = {};
    }


    private static calculateCacheHashForSymbol(signature, feature, resolution, selected): string {
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
        switch (feature.getGeometry().getType()) {
            case "Point":
                return feature.getGeometry().getCoordinates();
        }
        return null;

    }

    private static getIconCoordinates(feature, resolution) {
        let signature = feature.get('sig');
        let symbolAnchorCoordinate = getMostTopCoordinate(feature);
        let offset = signature.iconOffset;
        let resolutionFactor = resolution / 10;
        let symbolCoordinate = [signature.flipIcon ? symbolAnchorCoordinate[0] + offset * resolutionFactor : symbolAnchorCoordinate[0] - offset * resolutionFactor, symbolAnchorCoordinate[1] + offset * resolutionFactor];
        return [symbolAnchorCoordinate, symbolCoordinate]
    }

    private static createLineToIcon(feature, resolution) {
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

    private static showIcon(signature){
        return !signature.hideIcon && signature.src;
    }

    private static createDefaultStroke(scale, color, dashed=false){
        let strokeWidth = scale * 10;
        let stroke = new Stroke({
            color: DrawStyle.colorFunction(color, 1.0),
            width: strokeWidth
        });
        if(dashed){
            stroke.setLineDash([strokeWidth * 2, strokeWidth * 2]);
            stroke.setLineDashOffset(strokeWidth * 2);
        }
        return stroke;
    }

    private static getIconStyle(feature, resolution, signature, selected, scale): Style[] {
        const zIndex = selected ? Infinity: this.getZIndex(feature)
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

            if(showIcon) {
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
                if(imageFromMemoryDataUrl) {
                    imageFromMemory = this.imageCache[featureId]
                    if(!imageFromMemory){
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
                    scale: scaledSize ? scaledSize : scale*2.5,
                    opacity: 1,
                    rotation: feature.rotation !== undefined ? feature.rotation * Math.PI / 180 : 0,
                    src: imageFromMemory ? undefined : this.getImageUrl(signature.src),
                    img: imageFromMemory ? imageFromMemory : undefined,
                    imgSize: scaledSize ? [naturalDim, naturalDim]: undefined
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
        return new Stroke({
            color: "#fff5cb",
            width: this.calculateStrokeWidth(scale, feature.get('sig')) + scale * 30,
        });
    }


    private static getHighlightLineWhenSelectedStyle(feature, scale, selected): Style {
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
        if(highlightLine){
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
