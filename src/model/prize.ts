import {autoserializeAs, autoserializeAsArray} from "dcerialize";

export class Prize {
  @autoserializeAs(() => Number) id: number;
  @autoserializeAs(() => Number) price: number;
  @autoserializeAs(() => String) img: string;

  constructor(id: number, price: number, img:string) {
    this.id = id;
    this.price = price;
    this.img = img;
  }
}

export class PrizeList{
  @autoserializeAsArray(() => Prize) items: Prize[];
  @autoserializeAs(() => Number) total: number;

  constructor(items: Prize[], total: number) {
    this.items = items;
    this.total = total;
  }
}
