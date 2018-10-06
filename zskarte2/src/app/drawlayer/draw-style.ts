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
import Circle from 'ol/style/Circle';
import Text from 'ol/style/Text';
import Point from 'ol/geom/Point';

// This is a helper class which involves the definitions of stylings used to draw on the map
export class DrawStyle {

    static defaultScaleFactor = 0.2;

    static textScaleFactor = 1.2;

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

    static scaleFunction(resolution, scaleFactor): any {
        return scaleFactor * Math.sqrt(0.5 * resolution) / resolution;
    }

    static getDash(feature, resolution): any {
        if (feature.get('sig').style === 'dash') {
            const value = DrawStyle.scaleFunction(resolution, 20);
            return [value, value];
        } else {
            return [0, 0];
        }
    }

    // isFeatureFiltered(feature): boolean {
    //     return this.filter !== undefined && this.filter !== feature.get('sig').kat;
    // }


    static styleFunctionSelect(feature, resolution): any {
        // The feature shall not be displayed or is errorenous. Therefore, we return an empty style.
        const signature = feature.get('sig');
        // if (this.isFeatureFiltered(feature) || signature === undefined) {
        //    return [];
        // } else {
            if (signature.text !== undefined) {
                // It's a text-entry...
                return DrawStyle.textStyleFunction(feature, resolution, signature);
            } else {
                // It's a symbol-signature.
                return DrawStyle.imageStyleFunction(feature, resolution, signature, true);
            }
        // }
    }


    static styleFunction(feature, resolution): any {
        // The feature shall not be displayed or is errorenous. Therefore, we return an empty style.
        const signature = feature.get('sig');
        // if (this.isFeatureFiltered(feature) || signature === undefined) {
        //     return [];
        // } else {
            if (signature.text !== undefined) {
                // It's a text-entry...
                return DrawStyle.textStyleFunction(feature, resolution, signature);
            } else {
                // It's a symbol-signature.
                return DrawStyle.imageStyleFunction(feature, resolution, signature, false);
            }
        // }
    }

    static imageStyleFunction(feature, resolution, signature, selected): any {
        const isCustomSignature = signature.dataURL !== undefined;
        let scale;
        let symbol = null;
        if (isCustomSignature) {
            scale = DrawStyle.scaleFunction(resolution, DrawStyle.defaultScaleFactor);
            symbol = new Image();
            symbol.src = signature.dataURL;
        }
        scale = DrawStyle.scaleFunction(resolution, DrawStyle.defaultScaleFactor);

        const symbolStyle = new Style({
            stroke: new Stroke({
                color: DrawStyle.colorFunction(signature.kat, selected ? 'highlight' : 'default', 1.0),
                width: scale * 20,
                lineDash: DrawStyle.getDash(feature, resolution)
            }),
            fill: new Fill({
                color: DrawStyle.colorFunction(signature.kat, selected ? 'highlight' : 'default', selected ? 0.3 : 0.2)
            }),
            image: new Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: DrawStyle.scaleFunction(resolution, DrawStyle.defaultScaleFactor),
                opacity: 1,
                rotation: feature.get('rotation') !== undefined ? feature.get('rotation') * Math.PI / 180 : 0,
                src: isCustomSignature ? undefined : 'assets/img/signs/' + signature.src,
                img: isCustomSignature ? symbol : undefined,
                imgSize: isCustomSignature ? [300, 300] : undefined
            }))
        });
        const strokeStyle = new Style({
            stroke: new Stroke({
                color: [255, 255, 255, selected ? 0.7 : 0.5],
                width: scale * 40,
                lineDash: DrawStyle.getDash(feature, resolution)
            }),
            image: new Circle({
                radius: scale * 210,
                fill: new Fill({
                    color: [255, 255, 255, selected ? 0.9 : 0.6]
                })
            })
        });
        const highlightStyle = new Style({
            stroke: new Stroke({
                color: DrawStyle.colorFunction(signature.kat, 'highlight', 1.0),
                width: scale * 30
            })
        });

        return selected ? [strokeStyle, symbolStyle] : [highlightStyle, strokeStyle, symbolStyle];
    }

    static textStyleFunction(feature, resolution, signature) {
        return new Style({
            text: new Text({
                text: feature.get('sig').text,
                font: '30px sans-serif',
                rotation: feature.get('rotation') !== undefined ? feature.get('rotation') * Math.PI / 180 : 0,
                scale: DrawStyle.scaleFunction(resolution, DrawStyle.textScaleFactor),
                stroke: new Stroke({
                    color: '#FFFF66',
                    width: 3
                }),
                fill: new Fill({
                    color: 'black'
                })
            })
        });
    }

    static styleFunctionModify(feature, resolution) {
        return new Style({
            image: new Circle({
                radius: 20 * 2,
                fill: new Fill({
                    color: [255, 0, 0, 1]
                }),
                stroke: new Stroke({
                    color: [255, 255, 255, 1],
                    width: 20 / 2
                })
            }),
            zIndex: Infinity
        });
    }


    static colorFunction = function (type, style, alpha) {
        const color = DrawStyle.colorMap[type][style];
        if (color !== undefined) {
            return 'rgba(' + color + ', ' + (alpha !== undefined ? alpha : '1') + ')';
        } else {
            return 'blue';
        }
    };


    static arrowStyleFunction(feature, resolution) {
        const geometry = feature.getGeometry();
        const scale = DrawStyle.scaleFunction(resolution, 1);
        const styles = [
                new Style({
                    stroke: new Stroke({
                        color: DrawStyle.colorFunction(feature.get('sig').kat, 'default', 1.0),
                        width: scale * 10,
                        lineDash: [0, 0]
                    }),
                    fill: new Fill({
                        color: DrawStyle.colorFunction(feature.get('sig').kat, 'default', 0.2)
                    }),
                    image: new Icon(({
                        anchor: [0.5, 0.5],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        scale: DrawStyle.scaleFunction(resolution, 0.5),
                        opacity: 1,
                        src: 'assets/img/signs/' + feature.get('sig').src
                    }))
                })
            ]
        ;

        if (geometry.getType() === 'LineString') {
            geometry.forEachSegment(function (start, end) {
                const dx = end[0] - start[0];
                const dy = end[1] - start[1];
                const rotation = Math.atan2(dy, dx);
                // arrows
                styles.push(new Style({
                    geometry: new Point(end),
                    image: new Icon({
                        src: 'img/arrow' + feature.get('sig').kat + '.png',
                        scale: DrawStyle.scaleFunction(resolution, 2),
                        anchor: [0.75, 0.5],
                        rotateWithView: false,
                        rotation: -rotation
                    })
                }));
            });
        }
        return styles;
    }
}
