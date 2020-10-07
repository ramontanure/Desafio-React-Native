import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {COLOR} from '../util/global-style.css';

interface LoadingComponentProps {
  isLoading: boolean;
  color?: string;
  notShow?: boolean;
}

const LoadingComponent: React.SFC<LoadingComponentProps> = ({
  isLoading,
  notShow = true,
  color,
}) => {
  if (isLoading) {
    return (
      <View
        style={{
          display: !notShow ? 'flex' : 'none',
          position: 'absolute',
          justifyContent: 'center',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999999999,
          top: 0,
          elevation: 10000,
        }}>
        <ActivityIndicator animating size="large" color={COLOR.BASE} />
      </View>
    );
  } else {
    return <></>;
  }
};

export default LoadingComponent;
