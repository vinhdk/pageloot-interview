import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiNotificationsModule,
  TUI_SANITIZER,
  TuiThemeNightModule,
  TuiModeModule
} from '@taiga-ui/core';

import { PIMainShellMainModule } from '@main-shell';

import { AppComponent } from './containers';

function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

const PROVIDERS = [
  { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }
];

const MODULES = [
  BrowserModule,
  RouterModule,
  TuiRootModule,
  BrowserAnimationsModule,
  TuiDialogModule,
  HttpClientModule,
  TuiNotificationsModule,
  TuiThemeNightModule,
  TuiModeModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    }
  }),
  PIMainShellMainModule
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...MODULES
  ],
  providers: [
    ...PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
