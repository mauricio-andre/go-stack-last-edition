import { getRepository, Repository, In } from 'typeorm';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return findProduct;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const ids = products.map(product => product.id);
    const findProducts = await this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });

    return findProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const productsInDatabase = await this.findAllById(products);

    const productsToUpdate = productsInDatabase.map(productInDatabase => {
      const productToUpdate = productInDatabase;
      const findProduct = products.find(
        product => product.id === productToUpdate.id,
      );

      if (findProduct) {
        productToUpdate.quantity -= findProduct.quantity;
      }

      return productToUpdate;
    });

    await this.ormRepository.save(productsToUpdate);

    return productsToUpdate;
  }
}

export default ProductsRepository;
