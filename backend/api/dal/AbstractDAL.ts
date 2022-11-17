abstract class AbstractDAL<K> {
  abstract fetch(model: K): Promise<K>;
  abstract fetchAll(): Array<K>;
  abstract fetchById(id: string): Promise<K>;
  abstract update(model: K): Promise<K>;
  abstract insert(model: K): Promise<K>;
}

export default AbstractDAL;
