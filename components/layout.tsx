import React from 'react';
import {
  ImageProps,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  Divider,
  Icon,
  Layout as LayoutComponent,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

type Props = {
  title?: string;
  goBack?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
export default function Layout({ title, children, goBack, style }: Props) {
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={goBack} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {title == null ? (
        <></>
      ) : (
        <>
          <TopNavigation
            title={title}
            alignment="center"
            accessoryLeft={goBack && BackAction}
          />
          <Divider />
        </>
      )}
      <LayoutComponent style={[styles.contentContainer, style]}>
        {children}
      </LayoutComponent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

const BackIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="arrow-back" />
);
