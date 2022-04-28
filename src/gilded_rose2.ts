/**
 * 2nd -attempt when refactor
 */
export type Items = Item[];

export interface Item {
  name: string;
  sellIn: number;
  quality: number;
}

interface GildedRose {
  adjustQuality: (items: Items) => Items
}

const updateQuality = (item: Item) => {
  const newItem = {...item};

  if (newItem.name == 'Aged Brie' || newItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
    if (newItem.quality < 50) {
      newItem.quality = newItem.quality + 1;
    }

    if (newItem.name == 'Backstage passes to a TAFKAL80ETC concert' && newItem.quality < 50) {
      if (newItem.sellIn < 6) {
        newItem.quality = newItem.quality + 2;
      }
      else if (newItem.sellIn < 11) {
        newItem.quality = newItem.quality + 1;
      }
    }
    if (newItem.name == "Aged Brie" && newItem.sellIn < 1 && newItem.quality < 50) {
      newItem.quality = newItem.quality + 1
    }
  }
  else if (newItem.quality > 0 && newItem.name != 'Sulfuras, Hand of Ragnaros') {
    newItem.quality = newItem.quality - 1;
  }

  return newItem;
}

const adjustQuality = (items: Items): Items => {
  return items.map((item: Item) => {
    
    if (item.name == 'Aged Brie' || item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }

      if (item.name == 'Backstage passes to a TAFKAL80ETC concert' && item.quality < 50) {
        if (item.sellIn < 6) {
          item.quality = item.quality + 2;
        }
        else if (item.sellIn < 11) {
          item.quality = item.quality + 1;
        }
      }
      if (item.name == "Aged Brie" && item.sellIn < 1 && item.quality < 50) {
        item.quality = item.quality + 1
      }
    }
    else if (item.quality > 0 && item.name != 'Sulfuras, Hand of Ragnaros') {
      item.quality = item.quality - 1;
    }

    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn = item.sellIn - 1;
    }

    if (item.name === 'Backstage passes to a TAFKAL80ETC concert' && item.sellIn < 0) {
      item.quality = 0;
    }
    if (item.name !== "Aged Brie" && item.name != 'Sulfuras, Hand of Ragnaros' && item.quality > 0 && item.sellIn < 0) {
      item.quality = item.quality - 1;
    }

    return item;
  });
}

const gildedRose: GildedRose = { adjustQuality };
export default gildedRose;