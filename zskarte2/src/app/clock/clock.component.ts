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
import {SharedStateService} from "../shared-state.service";
import {I18NService} from "../i18n.service";

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

    historyDate = null;
    constructor(public i18n:I18NService, private sharedState: SharedStateService) {
        this.sharedState.history.subscribe(s => {
            this.historyDate = s ? new Date(s) : null;
            this.redefine();
        })

    }
    now: Date;

    ngOnInit() {
        this.update();
    }

    redefine(){
        this.now = this.historyDate ? this.historyDate : new Date();
    }

    update() {
       this.redefine();
        setTimeout(() => this.update(), 1000);
    }

}
