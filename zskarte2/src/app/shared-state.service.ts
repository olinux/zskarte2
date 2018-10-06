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

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {Sign} from './entity/sign';
import {Coordinate} from "./entity/coordinate";

@Injectable({
    providedIn: 'root'
})
export class SharedStateService {

    private signatureSource = new BehaviorSubject<Sign[]>(null);
    signatures = this.signatureSource.asObservable();

    private coordinateSource = new BehaviorSubject<Coordinate>(null);
    currentCoordinate = this.coordinateSource.asObservable();

    private historyDateSource = new BehaviorSubject<Date>(null);
    historyDate = this.historyDateSource.asObservable();

    private downloadSource = new BehaviorSubject<string>(null);
    downloadData = this.downloadSource.asObservable();

    private signSource = new BehaviorSubject<Sign>(null);
    currentSign = this.signSource.asObservable();

    private featureSource = new BehaviorSubject<any>(null);
    currentFeature = this.featureSource.asObservable();

    private deleteFeatureSource = new BehaviorSubject<any>(null);
    deletedFeature = this.deleteFeatureSource.asObservable();

    constructor() {
    }

    updateDownloadData(data: string) {
        this.downloadSource.next(data);
    }

    selectSign(sign: Sign) {
        this.signSource.next(sign);
    }

    selectFeature(feature: any) {
        this.featureSource.next(feature);
    }

    deleteFeature(feature: any) {
        if (feature != null) {
            this.deleteFeatureSource.next(feature);
            this.featureSource.next(null);
        }
    }

    gotoHistoryDate(date: Date) {
        this.historyDateSource.next(date);
    }

    gotoCoordinate(coordinate: Coordinate) {
        this.coordinateSource.next(coordinate);
    }

    setSignatures(signatures: Sign[]) {
        this.signatureSource.next(signatures);
    }

}
