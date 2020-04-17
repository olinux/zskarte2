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
import {Md5} from "ts-md5";

// This is a helper class which involves the definitions of stylings used to draw on the map
export class DrawStyle {

    static defaultScaleFactor = 0.2;

    static textScaleFactor = 1.2;

    static colorMap = ({
        'blue': {
            'default':   '0, 0, 255',
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

    static scale(resolution:number, scaleFactor:number): any {
        return Math.max(0.15, scaleFactor * Math.sqrt(0.5 * resolution) / resolution);
    }

    static getDash(lineStyle:string, resolution:number): any {
        if (lineStyle === 'dash') {
            const value = Math.max(30, DrawStyle.scale(resolution, 20));
            return [value, value];
        } else {
            return [0, 0];
        }
    }

    static getDashOffset(lineStyle:string, resolution:number): any {
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
        // if (this.isFeatureFiltered(feature) || signature === undefined) {
        //    return [];
        // } else {
        if (signature.text !== undefined && signature.text !== null) {
            // It's a text-entry...
            return DrawStyle.textStyleFunction(feature, resolution);
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
        if (signature.text !== undefined && signature.text !== null) {
            // It's a text-entry...
            return DrawStyle.textStyleFunction(feature, resolution);
        } else {
            // It's a symbol-signature.
            return DrawStyle.imageStyleFunction(feature, resolution, signature, false);
        }
        // }
    }


    private static symbolStyleCache = {}

    private static calculateCacheHashForSymbol(signature, feature, resolution, selected):string{
        return Md5.hashStr(JSON.stringify({
            kat: signature.kat,
            color: signature.color,
            selected: selected,
            opacity: signature.fillOpacity,
            resolution: resolution,
            lineStyle: signature.style,
            rotation: feature.rotation,
            signatureSrc: signature.src,
            signaturePayload: signature.dataUrl ? signature.dataUrl.src : null,
            strokeWidth: signature.strokeWidth
        })).toString();
    }


    static imageStyleFunction(feature, resolution, signature, selected): any {
        const isCustomSignature = signature.dataUrl !== undefined && signature.dataUrl !== null    ;
        let scale;
        let symbol = null;
        if (isCustomSignature) {
            symbol = new Image();
            symbol.src = signature.dataUrl.src;
        }
        scale = DrawStyle.scale(resolution, DrawStyle.defaultScaleFactor);
        const symbolCacheHash = DrawStyle.calculateCacheHashForSymbol(signature, feature, resolution, selected);
        let symbolStyle = this.symbolStyleCache[symbolCacheHash];
        if (!symbolStyle){
            console.log("Did not hit cache for symbol style - creating a new one!")
            symbolStyle  = this.symbolStyleCache[symbolCacheHash] = new Style({
                stroke: new Stroke({
                    color: DrawStyle.colorFunction(signature.kat, signature.color, selected ? 'highlight' : 'default', 1.0),
                    width: scale * 20 * (signature.strokeWidth !== undefined && signature.strokeWidth !== null ? signature.strokeWidth : 1),
                    lineDash: DrawStyle.getDash(signature.style, resolution),
                    lineDashOffset: DrawStyle.getDashOffset(signature.style, resolution)
                }),
                fill: new Fill({
                    color: DrawStyle.colorFunction(signature.kat, signature.color, selected ? 'highlight' : 'default', selected ? signature.fillOpacity == null ? 0.3 : Math.min(1, signature.fillOpacity + 0.1) : signature.fillOpacity == null ? 0.2 : Math.min(1, signature.fillOpacity))
                }),
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
                }))
            });
        }
        else{
            console.log("Hit cache for symbol style!")
        }
        return [symbolStyle];
    }

    static textStyleFunction(feature, resolution) {
        return new Style({
            text: new Text({
                text: feature.get('sig').text,
                font: '30px sans-serif',
                rotation: feature.rotation !== undefined ? feature.rotation * Math.PI / 180 : 0,
                scale: DrawStyle.scale(resolution, DrawStyle.textScaleFactor),
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

    static colorFunction = function (signatureKat, signatureColor, style, alpha) {
        if (signatureKat == null) {
            if (signatureColor !== undefined && signatureColor !== null) {
                let hexAlpha=(Math.floor(255*(alpha !== undefined ? alpha : 1))).toString(16);
                if(hexAlpha.length==1){
                    hexAlpha="0"+hexAlpha;
                }
                return signatureColor+hexAlpha;
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
