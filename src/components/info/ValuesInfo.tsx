import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Headline, Subheading, Paragraph } from 'react-native-paper';
import {styles} from './Styles';
import { useTranslation } from 'language/LanguageProvider';

export const ValuesInfo = () => {
  const dict = useTranslation();

  return (
      <ScrollView 
      style={{marginHorizontal: 10}}
      contentContainerStyle={{alignItems: 'center'}}>
      <Headline style={styles.heading}>{dict.valuesInfo.headline}</Headline> 
        <Paragraph style={styles.text}>{dict.valuesInfo.paragraph1}</Paragraph>
        <Subheading style={styles.subheading}>{dict.valuesInfo.subheading1}</Subheading>
        <Paragraph style={styles.text}>{dict.valuesInfo.paragraph2}</Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/valuesStartscreen.png')}
        />
        <Subheading style={styles.subheading}>{dict.valuesInfo.subheading2}</Subheading>
        <Paragraph style={styles.text}>{dict.valuesInfo.paragraph3}</Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/valuesRelationship.png')}
        />
        <Subheading style={styles.subheading}>{dict.valuesInfo.subheading3}</Subheading>
        <Paragraph style={styles.text}>{dict.valuesInfo.paragraph4}</Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/valuesActivities.png')}
        />
        <Subheading style={styles.subheading}>{dict.valuesInfo.subheading4}</Subheading>
        <Paragraph style={styles.text}>{dict.valuesInfo.paragraph5}</Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/valuesSupport.png')}
        />
        
      </ScrollView>
      
  );
  }
