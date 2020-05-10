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

import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedStateService} from "../shared-state.service";
import {I18NService} from "../i18n.service";
import {DrawlayerComponent} from "../drawlayer/drawlayer.component";

@Component({
    selector: 'app-geocoder',
    templateUrl: './geocoder.component.html',
    styleUrls: ['./geocoder.component.css']
})
export class GeocoderComponent implements OnInit {

    @Input() drawLayer: DrawlayerComponent;
    geocoderUrl = 'https://api3.geo.admin.ch/rest/services/api/SearchServer?type=locations&searchText='
    foundLocations = []
    inputText: string = undefined;
    selected = null;


    constructor(private http: HttpClient, private sharedState: SharedStateService, public i18n: I18NService) {
    }

    ngOnInit() {
    }

    private getCoordinate(geometry){
        switch(geometry.getType()){
            case "Point":
                return geometry.getCoordinates();
            case "LineString":
                return geometry.getCoordinates()[0];
            case "Polygon":
                return geometry.getCoordinates()[0][0];
        }
        return null;
    }


    private mapFeatureForSearch(f) {
        let sig = f.get('sig');
        let sign = this.i18n.getLabelForSign(sig)
        let label = ""
        if (sign) {
            label += "<i>" + sign + "</i> "
        }
        if (sig.label) {
            label += sig.label
        }
        let normalizedLabel = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let words = this.inputText.toLowerCase().split(" ");
        let allHits = true;

        words.forEach(word => {
            if (!normalizedLabel.toLowerCase().includes(word.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                allHits = false;
            }
        })
        let coordinates = this.getCoordinate(f.getGeometry());
        return {
            attrs: {
                label: label,
                normalizedLabel: normalizedLabel,
                mercatorCoordinates: coordinates,
                hit: coordinates ? allHits : false,
                feature: f
            },
            uuid: f.getId()
        }

    }

    geoCodeLoad() {
        if (this.inputText.length > 1) {
            const originalInput = this.inputText;
            this.http.get(this.geocoderUrl + this.inputText).subscribe(result => {
                if (this.inputText === originalInput) {
                    this.foundLocations = [];
                    this.drawLayer.source.getFeatures().map(f => this.mapFeatureForSearch(f)).filter(f => {
                        return f.attrs.hit;
                    }).forEach(f => {
                        this.foundLocations.push(f)
                    });
                    this.drawLayer.clusterSource.getFeatures().map(f => this.mapFeatureForSearch(f)).filter(f => {
                        return f.attrs.hit;
                    }).forEach(f => {
                        this.foundLocations.push(f)
                    });

                    result["results"].forEach(r => this.foundLocations.push(r));
                }
            });

        } else {
            this.foundLocations = [];
            this.sharedState.gotoCoordinate(null);
        }
    }

    getLabel(selected) {
        return selected ? selected.label.replace(/<[^>]*>/g, '') : undefined;
    }

    geoCodeSelected(event) {
        this.selected = event.option.value;
        this.goToCoordinate(true);
        this.inputText = null;
    }

    previewCoordinate(element) {
        this.doGoToCoordinate(element, false, false);
    }

    private doGoToCoordinate(element, center, select) {
        if (element) {
            if (element.mercatorCoordinates) {
                if (select) {
                    this.sharedState.selectFeature(element.feature);
                }
                this.sharedState.gotoCoordinate({
                    lat: element.mercatorCoordinates[1],
                    lon: element.mercatorCoordinates[0],
                    mercator: true,
                    center: center
                })
            } else {
                this.sharedState.gotoCoordinate({lat: element.lat, lon: element.lon, mercator: false, center: center})
            }
        } else {
            this.sharedState.gotoCoordinate(null)
        }
    }

    goToCoordinate(center: boolean) {
        this.doGoToCoordinate(this.selected, center, true);
    }


}
