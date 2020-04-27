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

import {Component, OnInit, ViewChild} from '@angular/core';
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

    @ViewChild('indicator') indicator;
    @ViewChild('timeline') timeline;
    @ViewChild('startSpacer') startSpacer;
    currentSessionId = null;
    history = null;
    private _historyDatesAll = null;
    private _historyDatesAllLocale = null
    private _historyDatesFiltered = null;
    private _historyDatesFilteredLocale = null;
    tagSource = null;
    public showHistory = false;
    itemHeight = null;
    filtered: boolean = true


    get historyDates(): string[] {
        if (this.filtered) {
            return this._historyDatesFiltered;
        }
        return this._historyDatesAll;
    }

    get historyDatesLocale(): string[] {
        if (this.filtered) {
            return this._historyDatesFilteredLocale;
        }
        return this._historyDatesAllLocale;
    }

    constructor(private sharedState: SharedStateService, private mapStore: MapStoreService, public i18n: I18NService) {
        this.currentSessionId = this.sharedState.getCurrentSession();
        this.sharedState.session.subscribe(s => {
            this.currentSessionId = s != null ? s.uuid : null
        });
    }

    ngOnInit(): void {
    }

    getTag(index: number): string {
        let key = this.historyDates[index];
        return this.tagSource && this.tagSource[key] ? this.tagSource[key] : null;
    }

    getLabel(index: number): string {
        let key = this.historyDates[index];
        if (this.tagSource && this.tagSource[key]) {
            return this.tagSource[key] + " (" + this.historyDatesLocale[index] + ")";
        }
        return this.historyDatesLocale[index];
    }


    loadHistory(history) {
        const TIME_DIFF_BETWEEN_EVENTS = 30 * 60 * 1000;
        this.history = history;
        this.tagSource = history.tags;
        this._historyDatesAll = Object.keys(history.states).sort().reverse();
        this._historyDatesAllLocale = this._historyDatesAll.map(h => new Date(JSON.parse(h)).toLocaleString());
        let lastDate: Date = null;
        this._historyDatesFiltered = [];
        for (let historyDate of this._historyDatesAll) {
            let realDate = new Date(JSON.parse(historyDate));
            if (!lastDate || historyDate === this._historyDatesAll[this._historyDatesAll.length - 1] || lastDate.getTime() - realDate.getTime() > TIME_DIFF_BETWEEN_EVENTS || historyDate in this.tagSource) {
                this._historyDatesFiltered.push(historyDate);
                lastDate = realDate;
            }
        }
        this._historyDatesFilteredLocale = this._historyDatesFiltered.map(h => new Date(JSON.parse(h)).toLocaleString());
        this.loading = false;
        if (this.historyDates.length > 0) {
            this.goToIndex(0, 0);
        }
    }


    private loadHistoryFromDB() {
        this.loading = true;
        this.mapStore.getHistory(this.currentSessionId).then(history => this.loadHistory(history));
    }

    toggleHistoryMode() {
        this.showHistory = !this.showHistory;
        this.sharedState.gotoHistory(null);
        if (this.showHistory) {
            this.loadHistoryFromDB();
        }
    }


    targetScroll = null;
    lastHandledScrollPosition = null;
    targetIndex = null;
    lastShownIndex = null;
    loading = false;

    goToIndex(index, delay) {
        this.ensureItemHeightCalc();
        let expectedPosition = index * this.itemHeight;
        if (this.timeline.nativeElement.scrollTop != expectedPosition) {
            //It's not a precise scroll - so we programmatically scroll to the correct position (we do this deferred to reduce the load)
            this.targetScroll = expectedPosition
            setTimeout(() => {
                if (this.timeline.nativeElement.scrollTop !== this.targetScroll) {
                    this.timeline.nativeElement.scrollTo(0, this.targetScroll);
                }
            }, delay);

        }
        this.targetIndex = index;
        this.loading = true;
        setTimeout(() => {
            if (this.targetIndex !== this.lastShownIndex) {
                this.lastShownIndex = this.targetIndex;
                this.sharedState.gotoHistory(this.historyDates[this.targetIndex])
            }
            this.loading = false;
        }, 500)
    }

    ensureItemHeightCalc() {
        if (!this.itemHeight) {
            this.itemHeight = this.indicator.nativeElement.clientHeight;
        }
    }

    handleScrollDeferred() {
        let scrollTop = this.timeline.nativeElement.scrollTop;
        if (!this.lastHandledScrollPosition || this.lastHandledScrollPosition !== scrollTop) {
            this.lastHandledScrollPosition = scrollTop;
            this.ensureItemHeightCalc();
            this.goToIndex(Math.round(scrollTop / this.itemHeight), 200);
        }
    }

    handleScroll(event) {
        setTimeout(() => this.handleScrollDeferred(), 200);
    }

    removeTag(index) {
        this.mapStore.removeTag(this.currentSessionId, this.historyDates[index]).then(() => {
            this.loadHistoryFromDB();

        });
    }

}
