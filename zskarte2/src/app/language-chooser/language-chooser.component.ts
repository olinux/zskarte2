import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SharedStateService} from "../shared-state.service";
import {PreferencesService} from "../preferences.service";
import {I18NService, LOCALES} from "../i18n.service";

@Component({
  selector: 'app-language-chooser',
  templateUrl: './language-chooser.component.html',
  styleUrls: ['./language-chooser.component.css']
})
export class LanguageChooserComponent implements OnInit {

  locales:string[] = LOCALES;

  constructor(private i18n:I18NService) { }

  ngOnInit(): void {
  }

  setLocale(locale:string){
    this.i18n.locale = locale;
  }

}
