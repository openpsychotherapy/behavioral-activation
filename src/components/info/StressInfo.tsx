import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Paragraph, Subheading } from 'react-native-paper';
import {styles} from './Styles';
import { useTranslation } from 'language/LanguageProvider';

export const StressInfo = () => {
  const dict = useTranslation();
    return (
      <ScrollView 
      style={{marginHorizontal: 10}}
      contentContainerStyle={{alignItems: 'center'}}> 
        <Subheading style={styles.text}>{dict.stress.header1}</Subheading>  
        <Paragraph style={styles.text}>{dict.stress.paragraph1}</Paragraph>
      </ScrollView>
    );
  }
