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
import {SharedStateService} from '../shared-state.service';
import {NgxIndexedDBService} from "ngx-indexed-db";
import {I18NService} from "../i18n.service";
import {MapStoreService} from "../map-store.service";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    historyDate = null;
    historyPerc = 100;
    currentSessionId = null;

    constructor(private sharedState: SharedStateService, private mapStore:MapStoreService, public i18n:I18NService) {
        this.currentSessionId = this.sharedState.getCurrentSession();
        this.sharedState.session.subscribe(s => {this.currentSessionId = s != null ? s.uuid : null});
    }

    getDateByPerc(perc): Promise<Date> {
        return this.mapStore.getFirstDateInHistory(this.currentSessionId).then(firstDateInHistory => this.findDateByPerc(firstDateInHistory, perc));
    }

    findDateByPerc(firstDateInHistory, perc): Date {
        if (firstDateInHistory === null) {
            firstDateInHistory = new Date();
        }
        const now = new Date();
        const diff = now.getTime() - firstDateInHistory.getTime();
        const diffToNow = Math.floor(diff / 100 * (100 - perc));
        return new Date(now.getTime() - diffToNow);
    }

    selectHistoryDate(history): Date {
        if (history !== undefined && history !== null && history.elements.length > 0) {
            return new Date(history.elements[0].time);
        }
        return new Date();
    }


    ngOnInit(): void {
    }

    toggleHistoryMode() {
        if (this.historyDate == null) {
            this.historyDate = new Date();
            this.sharedState.gotoHistoryDate(this.historyDate);
        } else {
            this.historyDate = null;
            this.sharedState.gotoHistoryDate(null);
        }
    }

    setHistoryDateByPercentage(perc) {
        this.getDateByPerc(perc).then(historyDate => {
            this.historyDate = historyDate;
            this.sharedState.gotoHistoryDate(this.historyDate);
        });
    }

}
