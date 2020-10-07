import React from 'react';
import DatePickerC, {DatePickerProps} from 'react-native-datepicker';

interface Props {
  onDateChange: (date: string) => void;
  date: string;
}

export default class DatePicker extends React.Component<
  Props | DatePickerProps
> {
  render() {
    return (
      <DatePickerC
        cancelBtnText="Cancelar"
        mode="date"
        showIcon={false}
        androidMode="spinner"
        customStyles={{
          btnCancel: {
            color: '#333',
          },
          btnConfirm: {
            color: '#333',
          },
          dateInput: {
            flex: 1,
            paddingLeft: 16,
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#e4e4e4',
            borderWidth: 0,
            // padding: 8,
            borderRadius: 24,
            fontSize: 14,
            height: 48,
          },
          dateTouch: {
            width: '100%',
          },
          placeholderText: {
            color: '#c9c9c9',
          },
          dateText: {
            color: '#a1a1a1',
            fontSize: 14,
          },
        }}
        format="DD/MM/YYYY"
        maxDate={new Date()}
        {...this.props}
      />
    );
  }
}
