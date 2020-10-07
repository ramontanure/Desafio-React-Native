import {StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export const COLOR = {
  BASE: '#ff5c18',
  // BASE: "#00b1c1",
  LIGHT: '#008299',
  BACKGROUND: '#008299',
  DARK: '#003d4d',
  SECONDARY: '#2ebab9',
};

export const SIZES = {
  SPACING: 16,
};

export default StyleSheet.create({
  text: {
    fontFamily: 'OpenSans',
    color: '#262626',
  },
  label: {
    fontSize: 15,
    paddingBottom: 0,
  },
  inputToggle: {
    borderRadius: 4,
    height: 24,
    padding: 12,
    paddingHorizontal: 0,
    paddingTop: 0,
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 2,
  },
  recebimentoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },
  tooltip: {
    fontFamily: 'OpenSans',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  notification: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    right: 7,
    backgroundColor: COLOR.SECONDARY,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebar: {
    flex: 2,
    backgroundColor: 'white',
  },
  footer: {
    flex: 6,
    backgroundColor: COLOR.BASE,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separador: {
    marginVertical: 8,
  },
  icon: {
    paddingHorizontal: 20,
  },
  mainContent: {
    flex: 8,
    paddingHorizontal: SIZES.SPACING,
    paddingBottom: SIZES.SPACING,
    backgroundColor: '#F7F7F7',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectPicker: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 48,
    padding: 12,
    borderColor: '#e1e1e1',
    borderWidth: 1,
  },
  listaTitulo: {
    width: '100%',
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
    padding: 20,
  },
  listaTituloText: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    fontSize: 14,
  },
  selectPickerText: {
    color: '#333',
    fontSize: 15,
  },
  produtoContainer: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: '#E1E1E1',
  },
  textArea: {
    height: heightPercentageToDP('10%'),
    backgroundColor: 'white',
    fontFamily: 'OpenSans',
    fontSize: 14,
    color: '#333',
  },
  inputTextPopup: {
    fontSize: 14,
    height: 40,
    borderWidth: 0,
    alignSelf: 'center',
    width: '80%',
    textAlign: 'center',
  },
  stripe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  stripeText: {fontSize: 14, fontFamily: 'OpenSans-Bold'},
  textTitle: {
    color: '#262626',
    fontSize: 20,
    fontFamily: 'OpenSans',
    overflow: 'hidden',
  },
  produtoText: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
  },
  body: {
    backgroundColor: '#F7F7F7',
  },
  inputText: {
    justifyContent: 'center',
    color: 'black',
    backgroundColor: '#e4e4e4',
    padding: 8,
    paddingLeft: 16,
    borderRadius: 24,
    fontSize: 14,
    height: 48,
  },
  section: {
    marginTop: heightPercentageToDP('5%'),
  },
  sectionTitle: {
    marginBottom: heightPercentageToDP('5%'),
  },
  scrollGrupo: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomColor: '#eee',
    maxHeight: 57.5,
    borderBottomWidth: 1,
  },
  scrollItemText: {
    fontSize: 14,
  },
  produtoCarrinho: {
    paddingVertical: 8,
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
  },
  scrollItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});
