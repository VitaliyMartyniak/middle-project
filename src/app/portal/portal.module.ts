import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { PortalLandingComponent } from './components/portal-landing/portal-landing.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { AddEditArticleComponent } from './views/add-edit-article/add-edit-article.component';
import {ProfileGuard} from "../shared/guards/profile.guard";
import { PaginationComponent } from './components/pagination/pagination.component';
import { ArticleSearchComponent } from './components/article-search/article-search.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ReadMoreArticleModalComponent } from './components/read-more-article-modal/read-more-article-modal.component';
import { WeatherWidgetsComponent } from './components/weather-widgets/weather-widgets.component';
import { LocationSearchModalComponent } from './components/location-search-modal/location-search-modal.component';
import { BitcoinValueComponent } from './components/bitcoin-value/bitcoin-value.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: PortalLandingComponent, children: [
                    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
                    {path: 'dashboard', component: DashboardComponent},
                    {path: 'article', component: AddEditArticleComponent},
                    {
                        path: 'profile',
                        canActivate: [ProfileGuard],
                        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
                    }
                ],
            },
            {path: '**', redirectTo: '/portal'},
        ]),
    ],
  exports: [RouterModule],
  declarations: [
    PortalLandingComponent,
    DashboardComponent,
    ArticlesComponent,
    WeatherWidgetComponent,
    AddEditArticleComponent,
    PaginationComponent,
    ArticleSearchComponent,
    FiltersComponent,
    ReadMoreArticleModalComponent,
    WeatherWidgetsComponent,
    LocationSearchModalComponent,
    BitcoinValueComponent,
  ]
})
export class PortalModule { }
