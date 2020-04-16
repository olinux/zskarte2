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
import {swissProjection} from "../projections";
import OlTileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import OlTileGridWMTS from 'ol/tilegrid/WMTS';
import OlTileWMTS from 'ol/source/WMTS';
import OlTileXYZ from 'ol/source/XYZ';
import {SharedStateService} from "../shared-state.service";
import {GeoadminService} from "../geoadmin.service";
import {I18NService} from "../i18n.service";


export function createGeoAdminLayer(layerId: string, timestamp:string, extension:string) {
    return new OlTileLayer({
        source: new OlTileWMTS({
            projection: swissProjection,
            url: "https://wmts10.geo.admin.ch/1.0.0/{Layer}/default/"+timestamp+"/2056/{TileMatrix}/{TileCol}/{TileRow}."+extension,
            tileGrid: new OlTileGridWMTS({
                origin: [swissProjection.getExtent()[0], swissProjection.getExtent()[3]],
                resolutions: swissProjection.resolutions,
                matrixIds: swissProjection.matrixIds,
                projection: swissProjection,
                resolution: 250
            }),
            layer: layerId,
            requestEncoding: "REST"
        }),
        opacity: 0.6
    })
}

@Component({
    selector: 'app-layers',
    templateUrl: './layers.component.html',
    styleUrls: ['./layers.component.css']
})
export class LayersComponent implements OnInit {

    constructor(private sharedState: SharedStateService, private geoAdminService: GeoadminService, public i18n:I18NService) {
    }

    currentLayer: Layer = null;

    features: any = null;

    offlineHost:string = this.findOfflineHost();

    layers: Layer[] = [
        {
            name: "Open Street Map",
            olLayer: new OlTileLayer({
                source: new OSM()
            })
        },
        {
            name: "SwissImage (GeoAdmin)",
            olLayer: new OlTileLayer({
                source: new OlTileXYZ({
                    attributions: ['<a target="new" href="https://www.swisstopo.admin.ch/' +
                    'internet/swisstopo/en/home.html">swisstopo</a>'],
                    url: 'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg'
                })
            })
        },
        {
            name: "Pixelkarte farbig (GeoAdmin)",
            olLayer: new OlTileLayer({
                source: new OlTileXYZ({
                    attributions: ['<a target="new" href="https://www.swisstopo.admin.ch/' +
                    'internet/swisstopo/en/home.html">swisstopo</a>'],
                    url: 'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg'
                })
            })
        },
        {
            name: "Pixelkarte grau (GeoAdmin)",
            olLayer: new OlTileLayer({
                source: new OlTileXYZ({
                    attributions: ['<a target="new" href="https://www.swisstopo.admin.ch/' +
                    'internet/swisstopo/en/home.html">swisstopo</a>'],
                    url: 'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg'
                })
            })
        },
        {
            name: "Offline",
            olLayer: new OlTileLayer({
                source: new OSM({name: "Offline", url: this.offlineHost+"/styles/osm-bright/{z}/{x}/{y}.png"})
            })
        }
    ];

    findOfflineHost(){
        const fromUrlParam = new URLSearchParams(document.location.search).get("offlineHost");
        if(fromUrlParam!==undefined && fromUrlParam!==null){
            localStorage.setItem('offlineHost', fromUrlParam);
        }
        const previouslyStored = localStorage.getItem('offlineHost');
        if(previouslyStored!==undefined && previouslyStored!==null){
            return previouslyStored.startsWith("http") ? previouslyStored : "http://"+previouslyStored;
        }
        return "http://localhost:8080";
    }

    filterFeatures(feature:any) {
        return feature.value.timestamps===undefined  || feature.value.timestamps.size() === 0;
    }

    toggleFeature(feature:any){
        if(feature.layer===undefined) {
            feature.layer = createGeoAdminLayer(feature.serverLayerName, feature.timestamps[0], feature.format);
            this.sharedState.addFeatureLayer(feature.layer);
        }
        else{
            this.sharedState.removeFeatureLayer(feature.layer);
            feature.layer = undefined;
        }
    }

    ngOnInit() {
        //By default, we're launching the first layer registered.
        this.currentLayer = this.layers[0];
        this.sharedState.switchToLayer(this.layers[0]);
        this.loadFeatures();
        this.i18n.currentLocale.subscribe(l => {
            this.loadFeatures();
        });
    }

    loadFeatures(){
        this.features = null;
        this.geoAdminService.getFeatures().subscribe(data=>{
            let newFeatures = [];
            for(let featureName in data){
                let feature = data[featureName];
                if(feature.timestamps!==undefined && feature.timestamps.length>0){
                    newFeatures.push(feature);
                }
            }
            newFeatures.sort((a, b) => a.label.localeCompare(b.label));
            this.features = newFeatures;
        })
    }

    changeToLayer(layer: Layer) {
        this.currentLayer = layer;
        this.sharedState.switchToLayer(layer);
    }

}