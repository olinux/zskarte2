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

@Component({
    selector: 'app-geocoder',
    templateUrl: './geocoder.component.html',
    styleUrls: ['./geocoder.component.css']
})
export class GeocoderComponent implements OnInit {

    geocoderUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=';

    constructor(private http: HttpClient, private sharedState: SharedStateService) {
    }

    ngOnInit() {
    }

    geocodeChange(newValue: string) {
        this.http.get(this.geocoderUrl + newValue).subscribe(result => {
            const results = <any[]>result;
            if (results.length > 0) {
                this.sharedState.gotoCoordinate({lat: parseFloat(results[0].lat), lon: parseFloat(results[0].lon)});
            }
        });
    }

}
