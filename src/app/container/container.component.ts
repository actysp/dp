import { Component, OnInit, ViewChild, HostListener} from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @ViewChild('content') content;

  private itemWidth: number = 236;
  private margin: number = 12;
  private itemWrapWidth: number = this.itemWidth + this.margin * 2;
  private marginBottom: number = 50;

  private colCount: number = 0;

  private items: Array<any> = [];
  private backgroundList: Array<string> = ['indianred', 'aquamarine', 'antiquewhite', 'cadetblue', 'cornflowerblue'];
  private count: number = 20;

  constructor() { }

  ngOnInit() {

    this.colCount = this.getColCount();
    this.items = this.requestItems();
    this.optimizeItemPosition();
  }

  getColCount(): number {

    let width = window.innerWidth;
    let itemWrapWidth = this.itemWrapWidth;
    let colCount = Math.floor(width / itemWrapWidth);

    if (colCount < 3) colCount = 3;

    return colCount;
  }

  requestItems(): Array<any> {
    const result = this.makeItems();

    return result;
  }

  makeItems(): Array<any> {
    const width = this.itemWidth;
    const itemWrapWidth = this.itemWrapWidth;
    const count = this.count;
    const preLength = this.items.length;

    let items = [];

    for (let i = 0; i < count; i++){
      // const x = itemWrapWidth * i;
      const _i = preLength + i;
      items.push({
        title: `${_i}의 제목입니다.`,
        content: _i,
        color: this.getRandomBackgroundColor(),
        width: `${width}px`,
        height: `${this.getRandomHeight(200, 450)}px`
        // transform: `translate(${x}px, ${y}px)`
        // transform: `translateX(${x}px)`
      });
    }

    return items;
  }

  getRandomHeight(minHeight, maxHeight): number {

    var randomHeight = Math.round(Math.random() * minHeight) + maxHeight - minHeight;

    return randomHeight;
  }

  getRandomBackgroundColor(): string {

    const index = Math.round(Math.random() * 4);
    return this.backgroundList[index];
  }

  optimizeItemPosition(): void {
    const items = this.items;
    const itemWrapWidth = this.itemWrapWidth;
    const colCount = this.colCount;
    const marginBottom = this.marginBottom;

    const optimizeModel = _getOptimizeModel(colCount);

    /*
      position 최적화 알고리즘이 들어가야 한다.

     */
    let i = 0;
    for (i; i < colCount; i++){
      const x = itemWrapWidth * i;
      const item = items[i];
      optimizeModel[i] = parseInt(item.height.replace(/\D/g, ''));
      item.transform = `translate(${x}px,0px)`;
    }

    for (i; i < items.length; i++){
      const item = items[i];
      const minHeight = Math.min(...optimizeModel);
      const minIndex = optimizeModel.indexOf(minHeight);

      // console.log(items[minIndex], items[minIndex].transform);
      let position = items[minIndex].transform.replace(/[a-z()]/gi, '').split(',');

      let x = parseInt(position[0]);
      let y = parseInt(position[1]);

      const applyHeight = y + minHeight + marginBottom;

      item.transform = `translate(${x}px,${applyHeight}px)`;
      optimizeModel[minIndex] = applyHeight + parseInt(item.height.replace(/\D/g, ''));
    }

    const containerHeight = Math.max(...optimizeModel);
    this.content.nativeElement.style.height = `${containerHeight}px`;

    function _getOptimizeModel(count){
      return new Array(count);
    }
  }

  changeItem(): void {
    console.log("click::");
    const items = this.makeItems();
    this.items = this.items.concat(items);
    this.optimizeItemPosition();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollHeight = parseInt(this.content.nativeElement.style.height);
    const currentScrollPosition = window.scrollY;
    const disPercent = Math.round(currentScrollPosition / scrollHeight * 100);
    // console.log("disttance:::", scrollHeight, currentScrollPosition);

    if (disPercent >= 60) {
      console.log('60 up');
      this.changeItem();
    }
  }
  @HostListener('window:resize')
  onResize(): void {
    const colCount = this.getColCount();

    if (this.colCount !== colCount) {
      this.colCount = colCount;
      this.optimizeItemPosition();
    }
  }


}
