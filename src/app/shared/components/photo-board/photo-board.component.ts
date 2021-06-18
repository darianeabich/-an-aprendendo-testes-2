import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from './interfaces/photo';

@Component({
  selector: 'app-photo-board',
  templateUrl: './photo-board.component.html',
  styleUrls: ['photo-board.component.scss']
})
export class PhotoBoardComponent implements OnChanges {

  @Input() public photos: Photo[];
  public rows: any[][] = []; // multidimencional: row e col

  // cada row tem que ter até 4 fotos
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos) { // se change mudou (recebeu photos)
      this.rows = this.groupColumns(changes.photos.currentValue); // pega o valor atual
    }
  }

  public groupColumns(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;

    for (let index = 0; index < photos.length; index += step) {
      newRows.push(photos.slice(index, index+step));
    }
    return newRows;
  }
}
