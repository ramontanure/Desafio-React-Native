import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import BottomNavigation from './bottom-navigation';
import {comecarPagamentos} from '../../redux';
import {ApplicationState} from '../../redux/store';

const mapStateToProps = (state: ApplicationState) => ({
  IDCOLETOR: state.dataset.IDCOLETOR,
  produtos: state.carrinho.produtos,
  modo: state.dataset.modo,
  recebimentos: state.dataSale.recebimentos,
  dataSale: state.dataSale,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({comecarPagamentos}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomNavigation);
