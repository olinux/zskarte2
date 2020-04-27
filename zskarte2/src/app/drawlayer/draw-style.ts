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
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Point from 'ol/geom/Point';
import MultiPoint from 'ol/geom/MultiPoint';
import LineString from 'ol/geom/LineString';
import Circle from 'ol/style/Circle';
import {Md5} from "ts-md5";
import {defineDefaultValuesForSignature} from "../entity/sign";

// This is a helper class which involves the definitions of stylings used to draw on the map
export class DrawStyle {

    static defaultScaleFactor = 0.2;

    static textScaleFactor = 1;

    static colorMap = ({
        'blue': {
            'default': '0, 0, 255',
            'highlight': '121, 153, 242'
        },
        'red': {
            'default': '255, 0, 0',
            'highlight': '255, 106, 106'
        },
        'other': {
            'default': '148, 139, 104',
            'highlight': '184, 172, 125'
        },
        'orange': {
            'default': '255, 145, 0',
            'highlight': '255, 204, 0'
        }
    });

    filter = null;

    public static getImageUrl(file): string {
        return 'assets/img/signs/' + file;
    }

    static scale(resolution: number, scaleFactor: number, min: number = 0.15): any {
        return Math.max(min, scaleFactor * Math.sqrt(0.5 * resolution) / resolution);
    }

    static getDash(lineStyle: string, resolution: number): any {
        if (lineStyle === 'dash') {
            const value = Math.max(30, DrawStyle.scale(resolution, 20));
            return [value, value];
        } else {
            return [0, 0];
        }
    }

    static getDashOffset(lineStyle: string, resolution: number): any {
        if (lineStyle === 'dash') {
            return Math.max(30, DrawStyle.scale(resolution, 20));
        } else {
            return 0;
        }
    }

    // isFeatureFiltered(feature): boolean {
    //     return this.filter !== undefined && this.filter !== feature.get('sig').kat;
    // }


    static styleFunctionSelect(feature, resolution): any {
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


    static styleFunction(feature, resolution): any {
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


    private static symbolStyleCache = {}
    private static vectorStyleCache = {}

    private static calculateCacheHashForSymbol(signature, feature, resolution, selected): string {
        return Md5.hashStr(JSON.stringify({
            resolution: resolution,
            rotation: feature.rotation,
            selected: selected,
            signatureSrc: signature.src,
            signaturePayload: signature.dataUrl ? signature.dataUrl.src : null,
            zindex: this.getZIndex(feature)
        })).toString();
    }

    private static calculateCacheHashForVector(signature, feature, resolution, selected): string {
        return Md5.hashStr(JSON.stringify({
            kat: signature.kat,
            color: signature.color,
            selected: selected,
            opacity: signature.fillOpacity,
            resolution: resolution,
            lineStyle: signature.style,
            strokeWidth: signature.strokeWidth,
            zindex: this.getZIndex(feature)
        })).toString();
    }


    private static getIconStyle(feature, resolution, signature, selected, scale): Style[] {
        const isCustomSignature = signature.dataUrl !== undefined && signature.dataUrl !== null;
        let symbol = null;
        if (isCustomSignature) {
            symbol = new Image();
            symbol.src = signature.dataUrl.src;
        }
        const zIndex = this.getZIndex(feature)
        const symbolCacheHash = DrawStyle.calculateCacheHashForSymbol(signature, feature, resolution, selected);
        let iconStyles = this.symbolStyleCache[symbolCacheHash];
        if (!iconStyles && (signature.src || signature.dataUrl) && feature.getGeometry()) {
            switch (feature.getGeometry().getType()) {
                case "Polygon":
                case "MultiPolygon":
                case "LineString":
                    return this.symbolStyleCache[symbolCacheHash] = [new Style({
                        image: new Circle({
                            radius: scale * 210,
                            fill: new Fill({
                                color: [255, 255, 255, selected ? 0.9 : 0.6]
                            })
                        }),
                        geometry: function (feature) {
                            return new Point(feature.getGeometry().getCoordinates()[0][0]);
                        },
                        zIndex: zIndex
                    }), new Style({
                        image: new Icon(({
                            anchor: [0.5, 0.5],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',
                            scale: DrawStyle.scale(resolution, DrawStyle.defaultScaleFactor),
                            opacity: 1,
                            rotation: feature.rotation !== undefined ? feature.rotation * Math.PI / 180 : 0,
                            src: isCustomSignature ? undefined : this.getImageUrl(signature.src),
                            img: isCustomSignature ? symbol : undefined,
                            imgSize: isCustomSignature ? [signature.dataUrl.nativeWidth, signature.dataUrl.nativeHeight] : undefined
                        })),
                        geometry: function (feature) {
                            return new Point(feature.getGeometry().getCoordinates()[0][0]);
                        },
                        zIndex: zIndex
                    })];
                case "Point":
                    return this.symbolStyleCache[symbolCacheHash] = [new Style({
                        image: new Circle({
                            radius: scale * 210,
                            fill: new Fill({
                                color: [255, 255, 255, selected ? 0.9 : 0.6]
                            })
                        }),
                        zIndex: zIndex
                    }), new Style({
                        image: new Icon(({
                            anchor: [0.5, 0.5],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',
                            scale: scale,
                            opacity: 1,
                            rotation: feature.rotation !== undefined ? feature.rotation * Math.PI / 180 : 0,
                            src: isCustomSignature ? undefined : this.getImageUrl(signature.src),
                            img: isCustomSignature ? symbol : undefined,
                            imgSize: isCustomSignature ? [signature.dataUrl.nativeWidth, signature.dataUrl.nativeHeight] : undefined
                        })),
                        zIndex: zIndex
                    })]
            }
        }
        return iconStyles;
    }

    private static getZIndex(feature){
        return feature.get('zindex') ? feature.get('zindex') : 0
    }

    private static getVectorStyle(feature, resolution, signature, selected, scale): Style {
        const vectorCacheHash = DrawStyle.calculateCacheHashForVector(signature, feature, resolution, selected);
        let vectorStyle = this.vectorStyleCache[vectorCacheHash];
        if (!vectorStyle) {
            return this.vectorStyleCache[vectorCacheHash] = new Style({
                stroke: new Stroke({
                    color: DrawStyle.colorFunction(signature.kat, signature.color, selected ? 'highlight' : 'default', 1.0),
                    width: scale * 20 * signature.strokeWidth,
                    lineDash: DrawStyle.getDash(signature.style, resolution),
                    lineDashOffset: DrawStyle.getDashOffset(signature.style, resolution)
                }),
                fill: new Fill({
                    color: DrawStyle.colorFunction(signature.kat, signature.color, selected ? 'highlight' : 'default', selected ? Math.min(1, signature.fillOpacity + 0.1) : Math.min(1, signature.fillOpacity))
                }),
                zIndex: this.getZIndex(feature)
            });
        }
        return vectorStyle;
    }

    private static getHighlightPointsWhenSelectedStyle(feature, scale, selected): Style {
        if(selected) {
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
            if(coordinatesFunction) {
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
                    zIndex: this.getZIndex(feature)
                })
            }
        }
        return null;
    }

    static imageStyleFunction(feature, resolution, signature, selected): any {
        defineDefaultValuesForSignature(signature);
        const scale = DrawStyle.scale(resolution, DrawStyle.defaultScaleFactor);
        let vectorStyle = this.getVectorStyle(feature, resolution, signature, selected, scale);
        let iconStyles = this.getIconStyle(feature, resolution, signature, selected, scale);
        let highlightPointsWhenSelectedStyle = this.getHighlightPointsWhenSelectedStyle(feature, scale, selected);
        let styles = [vectorStyle];
        if (iconStyles) {
            iconStyles.forEach(i => styles.push(i));
        }
        if(highlightPointsWhenSelectedStyle){
            styles.push(highlightPointsWhenSelectedStyle)
        }
        return styles;
    }

    static textStyleFunction(feature, resolution, selected) {
        let defaultScale = DrawStyle.scale(resolution, DrawStyle.defaultScaleFactor);
        let signature = feature.get('sig');
        defineDefaultValuesForSignature(signature);
        let textStyles = [new Style({
            stroke: new Stroke({
                color: signature.color,
                width: defaultScale * 20,
                lineDash: DrawStyle.getDash(signature.style, resolution),
                lineDashOffset: DrawStyle.getDashOffset(signature.style, resolution)
            }),
            zIndex: this.getZIndex(feature)
        }), new Style({
            text: new Text({
                text: signature.text,
                backgroundFill: new Fill({
                    color: [255, 255, 255, 1]
                }),
                font: signature.fontSize*30+'px sans-serif',
                rotation: feature.rotation !== undefined ? feature.rotation * Math.PI / 180 : 0,
                scale: DrawStyle.scale(resolution, DrawStyle.textScaleFactor, 0.4),
                fill: new Fill({
                    color: signature.color
                }),
                backgroundStroke: new Stroke({
                    color: signature.color,
                    width: defaultScale * 20
                }),
                padding: [5, 5, 5, 5]
            }),
            geometry: function (feature) {
                return new Point(feature.getGeometry().getCoordinates()[feature.getGeometry().getCoordinates().length - 1])
            },
            zIndex: this.getZIndex(feature)
        }), new Style({
            image: new Circle({
                radius: defaultScale * 50,
                fill: new Fill({
                    color: signature.color
                }),
            }),
            geometry: function (feature) {
                return new Point(feature.getGeometry().getCoordinates()[0])
            },
            zIndex: this.getZIndex(feature)
        })
        ]
        let highlightPoints = this.getHighlightPointsWhenSelectedStyle(feature, defaultScale, selected)
        if(highlightPoints){
            textStyles.push(highlightPoints);
        }
        return textStyles;
    }

    static colorFunction = function (signatureKat, signatureColor, style, alpha) {
        if (signatureKat == null) {
            if (signatureColor !== undefined && signatureColor !== null) {
                let hexAlpha = (Math.floor(255 * (alpha !== undefined ? alpha : 1))).toString(16);
                if (hexAlpha.length == 1) {
                    hexAlpha = "0" + hexAlpha;
                }
                return signatureColor + hexAlpha;
            }
        } else {
            const color = DrawStyle.colorMap[signatureKat][style];
            if (color !== undefined) {
                return 'rgba(' + color + ', ' + (alpha !== undefined ? alpha : '1') + ')';
            }
        }
        return 'rgba(121, 153, 242, ' + (alpha !== undefined ? alpha : '1') + ')';
    };

}
