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

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DrawlayerComponent} from '../drawlayer/drawlayer.component';
import {HistoryComponent} from "../history/history.component";
import {SharedStateService} from "../shared-state.service";
import {I18NService} from "../i18n.service";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    @Input() drawLayer: DrawlayerComponent;
    @Input() history: HistoryComponent;

    constructor(public i18n:I18NService, private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    setLocale(locale:string){
        this.i18n.locale = locale;
        this.cdr.detectChanges();
    }



}
