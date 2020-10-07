import {NavigationScreenProp} from 'react-navigation';
import {ProdutoVenda} from '../../redux/carrinho/types';
import {Recebimento, DataSale} from '../../redux/dataSale/types';

export interface Props {
  navigation: NavigationScreenProp<any>;
  IDCOLETOR: string;
  produtos: ProdutoVenda[];
  modo: string;
  comecarPagamentos(produto: ProdutoVenda[]): void;
  recebimentos: Recebimento[];
  dataSale: DataSale;
}
