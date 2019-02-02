import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: '', loadChildren: './page-landing/page-landing.module#PageLandingModule', pathMatch: 'full'},
	{ path: 'btcrevolution', loadChildren: './page-bitcoin/page-bitcoin.module#PageBitcoinModule', pathMatch: 'full' },
	{ path: 'cannabis', loadChildren: './cannabis/cannabis.module#CannabisModule', pathMatch: 'full'  },
	{ path: 'cryptoboom', loadChildren: './cryptoboom/cryptoboom.module#CryptoboomModule', pathMatch: 'full'  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
