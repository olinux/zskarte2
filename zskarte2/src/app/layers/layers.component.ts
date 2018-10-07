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

import {Component, OnInit} from '@angular/core';
import {Layer} from "./layer";
import {getMercatorProjection} from "../projections";
import OlTileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {SharedStateService} from "../shared-state.service";

@Component({
    selector: 'app-layers',
    templateUrl: './layers.component.html',
    styleUrls: ['./layers.component.css']
})
export class LayersComponent implements OnInit {

    constructor(private sharedState: SharedStateService) {
    }

    currentLayer:Layer = null;

    layers: Layer[] = [
        {
            name: "Open Street Map",
            projectionFunction: getMercatorProjection,
            olLayer: new OlTileLayer({
                source: new OSM()
            })
        },
        {
            name: "Offline",
            projectionFunction: getMercatorProjection,
            olLayer: new OlTileLayer({
                source: new OSM({name: "Offline", url: "http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png"})
            })
        }
    ];

    ngOnInit() {
        //By default, we're launching the first layer registered.
        this.currentLayer = this.layers[0];
        this.sharedState.switchToLayer(this.layers[0]);
    }


    changeToLayer(layer: Layer) {
        this.currentLayer = layer;
        this.sharedState.switchToLayer(layer);
    }

}
