import { Component, OnInit } from '@angular/core';
import { Coordinate } from '../../models/coordinate';
import * as $ from 'jquery';
import { CoordinateForm } from '../../models/coordinate-form';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-coordinates-visualizer',
  templateUrl: './coordinates-visualizer.component.html',
  styleUrls: ['./coordinates-visualizer.component.scss']
})
export class CoordinatesVisualizerComponent implements OnInit {
  coordinates: Coordinate[];
  grid: String[][];
  visualTable: string;

  public coordinateForm: FormGroup;

  lowestX: number;
  highestY: number;
  lengthX: number;
  lengthY: number;

  constructor() {
    this.coordinates = new Array<Coordinate>();
    this.coordinates.push(new Coordinate(0, 0));
  }

  ngOnInit() {
    this.coordinateForm = new FormGroup({
      inputX: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      inputY: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

  async generate() {
    console.log('1');
    await this.createVisualGrid().then(grid => {
      this.grid = grid;
      console.log('buildingGridFinisched');
    });
    console.log('2');
    await this.createVisualTableFromGrid().then(table => {
      this.visualTable = table;
      console.log('buildingVisualFinisched');
    });
    $('#visualisation').html(this.visualTable);
    return 1;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.coordinateForm.controls[controlName].hasError(errorName);
  }

  public createCoordinate = coordinateValue => {
    if (this.coordinateForm.valid) {
      this.executeCoordinateCreation(coordinateValue);
    }
  }

  private executeCoordinateCreation = coordinateValue => {
    const formValue: CoordinateForm = {
      inputX: coordinateValue.inputX,
      inputY: coordinateValue.inputY
    };
    this.coordinates.push(new Coordinate(formValue.inputX, formValue.inputY));
  }

  async createVisualGrid() {
    let highestX = 0;
    let highestY = 0;
    let lowestX = 0;
    let lowestY = 0;

    this.coordinates.forEach(function(coordinate) {
      if (coordinate.X > highestX) {
        highestX = +coordinate.X;
      }
      if (coordinate.Y > highestY) {
        highestY = +coordinate.Y;
      }
      if (coordinate.X < lowestX) {
        lowestX = +coordinate.X;
      }
      if (coordinate.Y < lowestY) {
        lowestY = +coordinate.Y;
      }
    });

    if (lowestX < 0) {
      lowestX = +lowestX * -1;
    }
    if (lowestY < 0) {
      lowestY = +lowestY * -1;
    }

    const xHeight: number = +highestX + +lowestX + 1;
    const yHeight: number = +highestY + +lowestY + 1;

    const grid = new Array<String[]>(xHeight);

    for (let index = 0; index < xHeight; index++) {
      grid[index] = new Array<String>(yHeight);
    }

    this.coordinates.forEach(function(coordinate) {
      let newX = 0;
      let newY = 0;

      if (coordinate.X < 0) {
        newX = +lowestX - +coordinate.X * -1;
      }
      if (coordinate.X >= 0) {
        newX = +lowestX + +coordinate.X;
      }

      if (coordinate.Y < 0) {
        newY = +highestY + +coordinate.Y * -1;
      }
      if (coordinate.Y >= 0) {
        newY = +highestY - +coordinate.Y;
      }

      const gridX = grid[newX];
      gridX[newY] = '(' + coordinate.X + '/' + coordinate.Y + ')';
    });

    this.lengthX = xHeight;
    this.lengthY = yHeight;
    this.highestY = highestY;
    this.lowestX = lowestX;
    return grid;
  }

  async createVisualTableFromGrid() {
    return this.createTables();
  }

  private async createTables() {
    let html = '<table>';
    html = await this.createRows(html);
    html = html + '</table>';
    return html;
  }

  private async createRows(html: string) {
    for (let i = 0; i < this.lengthY; i++) {
      html = html + '<tr>';
      html = await this.createColumns(html, i);
      html = html + '</tr>';
    }
    return html;
  }

  private async createColumns(html: string, i: number) {
    for (let j = 0; j < this.lengthX; j++) {
      html = html + '<th max-width: 3px;>|</th>';
      if (this.grid[j][i] == null || this.grid[j][i] == '') {
        html = html + '<th style="text-align: center;min-width: 40px;">-</th>';
      } else {
        const koo = this.grid[j][i];
        html = html + '<th style="text-align: center; min-width: 40px;">' + koo + '</th>';
      }
    }
    html = html + '<th>|</th>';
    return html;
  }
}
