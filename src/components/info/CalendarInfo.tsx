import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Headline, Subheading, Paragraph } from 'react-native-paper';
import {styles} from './Styles';
import { useTranslation } from 'language/LanguageProvider';

export const CalendarInfo = () => {
  const dict = useTranslation();

  return (
      <ScrollView 
      style={{marginHorizontal: 10}}
      contentContainerStyle={{alignItems: 'center'}}>
      <Headline style={styles.heading}>{dict.calendarInfo.headline}</Headline> 
        <Paragraph style={styles.text}>{dict.calendarInfo.paragraph1}</Paragraph>
        <Subheading style={styles.subheading}>{dict.calendarInfo.subheading1}</Subheading>
        <Paragraph style={styles.text}>{dict.calendarInfo.paragraph2}</Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/calendarStartscreen.png')}
        />
        <Subheading style={styles.subheading}>{dict.calendarInfo.subheading2}</Subheading>
        <Paragraph style={styles.text}>{dict.calendarInfo.paragraph3}</Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/calendarPlanning.png')}
        />
      </ScrollView>
      
  );
  }
