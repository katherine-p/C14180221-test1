import { Component } from '@angular/core';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public fotoService:FotoService) {}

  async ngOnInit()
  {
    await this.fotoService.loadFoto();
  }

}
