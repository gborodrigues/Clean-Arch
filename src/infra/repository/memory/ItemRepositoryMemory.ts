import Item from '../../../domain/entity/Item';
import ItemRepository from '../../../domain/repository/ItemRepository';

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[];

  constructor() {
    this.items = [
      new Item(1, 'Instrumentos musicais', 'Guitarra', 1000),
      new Item(2, 'Instrumentos musicais', 'Amplificador', 1000),
      new Item(3, 'Instrumentos musicais', 'Cabo', 1000),
    ];
  }

  async findById(idItem: number): Promise<Item> {
    const item = this.items.find(item => item.idItem === idItem);
    if (!item) throw new Error('Item not found');
    return item;
  }
}
