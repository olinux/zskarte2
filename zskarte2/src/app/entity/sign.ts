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

import {CustomImage} from "./customImage";

export interface Sign {
    type: string;
    kat: string;
    src: string;
    de?: string;
    fr?: string;
    en?: string;
    text?:string;
    label?:string;
    fontSize?: number;
    style?:string;
    example?:string;
    fillOpacity?:number;
    color?:string;
    dataUrl?:CustomImage;
    strokeWidth?:number;
    iconOffset?: number[];
}

export function defineDefaultValuesForSignature(signature:Sign){
    if(!signature.style){
        signature.style="solid";
    }
    if(!signature.color){
        signature.color = "#535353";
    }
    if(!signature.fillOpacity){
        signature.fillOpacity = 0.2;
    }
    if(!signature.strokeWidth){
        signature.strokeWidth = 1;
    }
    if(!signature.fontSize){
        signature.fontSize = 1;
    }
}
