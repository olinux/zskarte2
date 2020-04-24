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

import {Viewport} from "./viewport";

export interface ZSO {
    id: string;
    name: string;
    url: string;
    initialViewPort: Viewport;
    defaultLocale: string;
}

export function getZSOById(zsoId:string):ZSO{
    for(let z of LIST_OF_ZSO){
        if(zsoId === z.id){
            return z;
        }
    }
    return null;
}

export const BERN_PLUS: ZSO = {
    id: "be_plus",
    name: "ZSO Bern Plus",
    initialViewPort: { coordinates:  [829038.2228723184, 5933590.521128002], zoomLevel: 16},
    url: "http://www.zso-bern-plus.ch/",
    defaultLocale: "de"
};

export const FRIBOURG: ZSO = {
    id: "pci_fr",
    name: "PCi Fribourgeoise",
    initialViewPort: {coordinates: [784702.5323756159, 5912939.19705637], zoomLevel: 10},
    url: "https://www.pci-fr.ch/pcf/",
    defaultLocale: "fr"
};

export const LIST_OF_ZSO: ZSO[] = [BERN_PLUS, FRIBOURG]
