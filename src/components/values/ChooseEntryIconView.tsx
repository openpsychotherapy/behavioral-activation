import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ValuesStackParamList } from '../ValuesScreen';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';
import { IconList } from '../activity/IconList';
import { IconMeny } from '../IconMeny';
import { CircleButton } from './CircleButton';

type ChooseEntryIconViewRouteProp = RouteProp<
  ValuesStackParamList,
  'ChooseEntryIconView'
>;

type ChooseEntryIconViewNavigationProp = StackNavigationProp<
  ValuesStackParamList,
  'ChooseEntryIconView'
>;

interface ChooseEntryIconViewProps {
  route: ChooseEntryIconViewRouteProp;
  navigation: ChooseEntryIconViewNavigationProp;
}

export const ChooseEntryIconView = ({route, navigation}: ChooseEntryIconViewProps) => {
    const [visible, setVisible] = React.useState(false);
    const { colors } = useTheme();
    const { title, navigateBack, categoryString } = route.params;
  
    const iconPressCallback = (pressedIcon: Number, icon: string) => {
      navigation.navigate('AddEntryView', {
        title: title,
        navigateBack: navigateBack,
        categoryString: categoryString,
        icon: icon,
      });
      setVisible(false);
    };
  
    const iconListButton = () => {
      setVisible(true);
    };
  
    return (
      <View style={{flex: 1}}>
        <IconList pressCallback={iconPressCallback} visible={visible} setVisible={setVisible} />
        <IconMeny pressCallback={iconPressCallback}/>
  
        <View style={{ paddingBottom: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <CircleButton icon='menu' size={40} backgroundColor={colors.accent} onPress={iconListButton} />
        </View>
      </View>
    );
  }
  