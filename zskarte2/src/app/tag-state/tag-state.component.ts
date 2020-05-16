/*
 * Copyright © 2018-2020 ZSO Bern Plus / PCi Fribourg
 *
 * This file is part of Zivilschutzkarte 2.
 *
 * Zivilschutzkarte 2 is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * Zivilschutzkarte 2 is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with
 * Zivilschutzkarte 2.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 */

import {Component, OnInit} from '@angular/core';
import {I18NService} from "../i18n.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-tag-state',
  templateUrl: './tag-state.component.html',
  styleUrls: ['./tag-state.component.css']
})
export class TagStateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TagStateComponent>, public i18n:I18NService) { }

  tag:string

  ngOnInit(): void {

  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  submit(): void{
    this.dialogRef.close(this.tag);
  }
}
