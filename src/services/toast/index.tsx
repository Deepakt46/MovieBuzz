/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Toast, {BaseToastProps, ErrorToast} from 'react-native-toast-message';

const toastConfig = {
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        backgroundColor: 'red',
      }}
      contentContainerStyle={{paddingHorizontal: 10}}
      text1Style={{
        color: '#fff',
      }}
      text2Style={{
        color: '#fff',
      }}
      text2NumberOfLines={4}
    />
  ),
};

const notifiError = (title: string, subtitle?: string) =>
  Toast.show({
    type: 'error',
    text1: title,
    text2: subtitle,
    topOffset: 60,
  });
const notifiSuccess = (title: string, subtitle?: string) =>
  Toast.show({
    type: 'success',
    text1: title,
    text2: subtitle,
    topOffset: 60,
  });

  const notifiWarning = (title: string, subtitle?: string) =>
    Toast.show({
      type: 'info',
      text1: title,
      text2: subtitle,
      topOffset: 60,
    });

const withToast = (Component: React.ComponentType) => () =>
  (
    <>
      <Component />
      <Toast config={toastConfig} />
    </>
  );

export {withToast, notifiError, notifiSuccess, notifiWarning};
