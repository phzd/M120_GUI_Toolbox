import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreathalyzerComponent } from './features/breathalyzer/components/breathalyzer/breathalyzer.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { MetricUnitsComponent } from './features/metric-units/components/metric-units/metric-units.component';
import { CoordinatesVisualizerComponent } from './features/coordinates-visualizer/components/coordinates-visualizer/coordinates-visualizer.component';
import { HashGeneratorComponent } from './features/hash-generator/components/hash-generator/hash-generator.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'breathalyzer', component: BreathalyzerComponent },
  { path: 'metric-units', component: MetricUnitsComponent },
  { path: 'coordinates-visualizer', component: CoordinatesVisualizerComponent },
  { path: 'hash-generator', component: HashGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
