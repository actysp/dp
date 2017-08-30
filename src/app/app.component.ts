import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title: string = 'dpShop';
  itemsList: Array<any> = [];

  backgroundList: Array<string> = ['indianred', 'aquamarine', 'antiquewhite', 'cadetblue', 'cornflowerblue'];
  count: number = 5;

  ngOnInit(): void {

    this.itemsList = this._getItemList();
  }

  _getItemList(): Array<any> {

    let itemList = [];

    for (let i = 0; i < this.count; i++) {
      itemList.push({
        title: `${i}의 제목입니다.`,
        content: i,
        color: this.getRandomBackgroundColor()
      });
    }

    return itemList;
  }

  changeItem(): void {

    const initValue = Math.floor(Math.random() * 100);
    const count = initValue + this.count;
    let itemList = [];

    for (let i = initValue; i < count; i++){
      itemList.push({
        title: `${i}의 제목입니다.`,
        content: i,
        color: this.getRandomBackgroundColor()
      });
    }

    this.itemsList = itemList;
  }

  getRandomBackgroundColor(): string {

    const index = Math.round(Math.random() * 4);
    return this.backgroundList[index];
  }
}
