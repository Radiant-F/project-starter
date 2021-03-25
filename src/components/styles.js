import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  imgIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  bg: {
    height: '100%',
    flex: 1,
    backgroundColor: '#0000002b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subView: {
    backgroundColor: '#0a9dff',
    elevation: 3,
    paddingBottom: 2.5,
    paddingTop: 7.5,
    width: '95%',
    maxWidth: 480,
  },
  mainSubView: {
    backgroundColor: 'white',
    // borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  text: {
    includeFontPadding: false,
    fontSize: 30,
    // color: 'white',
    fontWeight: 'bold',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  button: {
    backgroundColor: 'lime',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    width: 90,
    height: 50,
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0.5,
      height: 0.5,
    },
  },
  viewSplitter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '95%',
  },
  modals: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgHeader: {
    width: 20,
    height: 20,
  },
  modalContainer: {
    marginVertical: 10,
  },
  imgLock: {
    width: 25,
    height: 25,
  },
  header: {
    padding: 12.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    includeFontPadding: false,
  },
  viewOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    padding: 12.5,
  },
  iconOption: {
    marginRight: 10,
  },
});
