import { NgModule } from '@angular/core';
import "@angular/compiler";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { WizardComponent } from './pages/wizard/wizard.component';
import { AccountComponent } from './pages/account/account.component';
// import { DashOneComponent } from './pages/dash-one/dash-one.component';
// import { DashAttackComponent } from './pages/dash-attack/dash-attack.component';
// import { TelcoEnterpriseComponent } from './pages/telco-enterprise/telco-enterprise.component';
import { TelcoSectorleadComponent } from './pages/telco-sectorlead/telco-sectorlead.component';
import { TelcoKillchainComponent } from './pages/telco-killchain/telco-killchain.component';
import { IcsAssetsComponent } from './pages/ics-assets/ics-assets.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { AssetDetailsComponent } from './pages/asset-details/asset-details.component';
import { TelcoKillchainV2Component } from './pages/telco-killchain-v2/telco-killchain-v2.component';
import { AbstractionLayerComponent } from './pages/abstraction-layer/abstraction-layer.component';
// import { EnterpriseRiskComponent } from './pages/enterprise-risk/enterprise-risk.component';
import { RemoteAccessComponent } from './pages/enterprise-risk/remote-access/remote-access.component';
import { VpnComponent } from './pages/enterprise-risk/vpn/vpn.component';
import { UnsecuredServicesComponent } from './pages/enterprise-risk/unsecured-services/unsecured-services.component';
import { PiiLeaksComponent } from './pages/enterprise-risk/pii-leaks/pii-leaks.component';
import { UserBehaviourComponent } from './pages/enterprise-risk/user-behaviour/user-behaviour.component';


// import { ThreathuntingComponent } from './pages/threathunting/threathunting.component';
import { ThreatEventsComponent } from './pages/threathunting/threat-events/threat-events.component';
import { ScansComponent } from './pages/threathunting/scans/scans.component';
import { CompromisedAssetsComponent } from './pages/threathunting/compromised-assets/compromised-assets.component';

import { GraphDomainComponent } from './pages/graph-domain/graph-domain.component';
import { GraphIpComponent } from './pages/graph-ip/graph-ip.component';
import { GraphThreatComponent } from './pages/graph-threat/graph-threat.component';
import { LayoutMasterComponent } from './shared/layout/layout-master/layout-master.component';
import { OtTimelineComponent } from './pages/ot-timeline/ot-timeline.component';
import { ScamComponent } from './pages/sectorial/scam/scam.component';
import { GraphSiemComponent } from './pages/graph-siem/graph-siem.component';
import { DashNationalComponent} from './pages/dash-national/dash-national/dash-national.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: HomeComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: HomeComponent }],
    canActivate: [AuthGuard],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  {
    path: 'account',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: AccountComponent }],
    canActivate: [AuthGuard],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  {
    path: 'wizard',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: WizardComponent }],
    canActivate: [AuthGuard],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  // {
  //   path: 'dash-one',
  //   component: LayoutMasterComponent,
  //   pathMatch: 'full',
  //   children: [{ path: '', component: DashOneComponent }],
  //   canActivate: [AuthGuard],
  //   // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  // },
  // {
  //   path: 'dash-attack',
  //   component: LayoutMasterComponent,
  //   pathMatch: 'full',
  //   children: [{ path: '', component: DashAttackComponent }],
  //   canActivate: [AuthGuard],
  //   // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  // },
  // {
  //   path: 'telco-enterprise',
  //   component: LayoutMasterComponent,
  //   pathMatch: 'full',
  //   children: [{ path: '', component: TelcoEnterpriseComponent }],
  //   canActivate: [AuthGuard],
  //   // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  // },
  {
    path: 'telco-sectorlead',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: TelcoSectorleadComponent }],
    canActivate: [AuthGuard],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  {
    path: 'telco-killchain',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: TelcoKillchainComponent }],
    canActivate: [AuthGuard],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  {
    path: 'abstraction-layer-threat-events',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: AbstractionLayerComponent }],
    canActivate: [AuthGuard],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  {
    path: 'abstraction-layer-domain',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: GraphDomainComponent }],
    canActivate: [AuthGuard],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  {
    path: 'abstraction-layer-ip',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: GraphIpComponent }],
    canActivate: [AuthGuard],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  {
    path: 'abstraction-layer-threat',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: GraphThreatComponent }],
    canActivate: [AuthGuard],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  
  {
    path: 'ics-assets',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: IcsAssetsComponent }],
    // canActivate: [AuthGuard],
    canActivate: [],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  {
    path: 'assets',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: AssetsComponent }],
    // canActivate: [AuthGuard],
    canActivate: [],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  {
    path: 'asset-details',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: AssetDetailsComponent }],
    // canActivate: [AuthGuard],
    canActivate: [],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },
  {
    path: 'telco-killchain-v2',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: TelcoKillchainV2Component }],
    canActivate: [AuthGuard],
  },
  {
    path: 'ot-timeline',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: OtTimelineComponent }],
    canActivate: [AuthGuard],
    // data: { roles: ["CONTENT_GLASS:ADMIN", "CONTENT_GLASS:RULES_ADMIN"] },
  },

  {
    path: 'graph-siem',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: GraphSiemComponent }],
    canActivate: [AuthGuard],
  },

  {
    path: 'dash-national',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: DashNationalComponent }],
    canActivate: [AuthGuard],
  },

  /*
  {
    path: 'enterprise-risk',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: EnterpriseRiskComponent }],
    canActivate: [AuthGuard],
  },
  */
  {
    path: 'remote-access',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: RemoteAccessComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'vpn',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: VpnComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'unsecured-services',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: UnsecuredServicesComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'pii-leaks',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: PiiLeaksComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'user-behaviour',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: UserBehaviourComponent }],
    canActivate: [AuthGuard],
  },

  /*
  {
    path: 'threathunting',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: ThreathuntingComponent }],
    canActivate: [AuthGuard],
  },
  */
  {
    path: 'threat-events',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: ThreatEventsComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'scans',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: ScansComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'compromised-assets',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: CompromisedAssetsComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'scam',
    component: LayoutMasterComponent,
    pathMatch: 'full',
    children: [{ path: '', component: ScamComponent }],
    canActivate: [AuthGuard],
  },
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

