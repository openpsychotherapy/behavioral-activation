import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Paragraph } from 'react-native-paper';
import {styles} from './Styles';
import { useTranslation } from 'language/LanguageProvider';

export const BehaviouralActivation = () => {
  const dict = useTranslation();
    return (
      <ScrollView 
      style={{marginHorizontal: 10}}
      contentContainerStyle={{alignItems: 'center'}}> 
        <Paragraph style={styles.text}>{dict.behavioralActivation.paragraph1}</Paragraph>
        <Paragraph style={styles.text}>{dict.behavioralActivation.paragraph2}</Paragraph>
        <Paragraph style={styles.text}>{dict.behavioralActivation.paragraph3}</Paragraph>
      </ScrollView>
    );
  }
