/**
 * Final attempt to refactor + fix test for Conjured Item
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

const adjustQuality = (items: Items): Items => {
  return items.map((item: Item) => {

    const sellIn = item.name != 'Sulfuras, Hand of Ragnaros' ? item.sellIn - 1 : item.sellIn;
    let quality = item.quality;

    // @ts-ignore
    const handler = mapperAdjustQualityHandler?.[item.name];
    if (typeof handler === 'function') {
      return handler(item, sellIn)
    }

    // the rest
    if (item.name != 'Sulfuras, Hand of Ragnaros' && quality > 0) {
      quality = quality - 1;
      if (sellIn < 0 && quality > 0) {
        quality -= 1;
      }
    }

    return {
      ...item,
      quality,
      sellIn,
    };
  });
}

const gildedRose: GildedRose = { adjustQuality };
export default gildedRose;


const adjustQualityByBakcstage = (item, sellIn) => {
  let quality = item.quality;
  if (quality >= 50) {
    return {
      ...item,
      sellIn,
      quality: sellIn < 0 ? 0 : quality,
    }
  }

  if (sellIn < 5) {
    quality = quality + 2;
  }
  else if (sellIn < 10) {
    quality = quality + 1;
  }

  return {
    ...item,
    sellIn,
    quality: sellIn < 0 ? 0 : quality + 1,
  }
}

const adjustQualityByAgedBrie = (item, sellIn) => {
  let quality = item.quality;
  quality = quality < 50 ? quality + 1 : quality;
  return {
    ...item,
    sellIn,
    quality: (sellIn < 0 && quality < 50)
        ? quality + 1
        : quality,
  }
}

const adjustQualityByConjuredItem = (item) => {
  let quality = item.quality;
  if (quality !== 0) {
    quality = item.sellIn > 0 ? quality - 2 : quality - 4;
  }

  return {
    ...item,
    sellIn: item.sellIn - 1,
    quality,
  }
}

const mapperAdjustQualityHandler = {
  "Backstage passes to a TAFKAL80ETC concert": adjustQualityByBakcstage,
  "Aged Brie": adjustQualityByAgedBrie,
  "Conjured Mana Cake": adjustQualityByConjuredItem
}
