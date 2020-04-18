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
import {HttpClient} from "@angular/common/http";
import {SharedStateService} from "../shared-state.service";
import {I18NService} from "../i18n.service";
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-geocoder',
    templateUrl: './geocoder.component.html',
    styleUrls: ['./geocoder.component.css']
})
export class GeocoderComponent implements OnInit {

    geocoderUrl = 'https://api3.geo.admin.ch/rest/services/api/SearchServer?type=locations&searchText='
    //geocoderUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=';
    foundLocations = []
    formControl = new FormControl();
    inputText: string = undefined;

    constructor(private http: HttpClient, private sharedState: SharedStateService, public i18n:I18NService) {
    }

    ngOnInit() {
    }

    geoCodeLoad() {
        if(this.inputText.length>1) {
            const originalInput = this.inputText;
            this.http.get(this.geocoderUrl + this.inputText).subscribe(result => {
                if(this.inputText === originalInput) {
                    this.foundLocations = <any[]>(result["results"]);
                }
            });
        }
        else{
            this.foundLocations = [];
        }
    }

    getLabel(selected){
        return selected ? selected.label.replace(/<[^>]*>/g, '') : undefined;
    }

    geoCodeChange(selected){
        this.sharedState.gotoCoordinate({lat: selected.lat, lon: selected.lon})
    }

}
