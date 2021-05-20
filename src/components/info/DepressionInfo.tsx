import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Paragraph } from 'react-native-paper';
import {styles} from './Styles';
import { useTranslation } from 'language/LanguageProvider';

export const DepressionInfo = () => {
  const dict = useTranslation();
    return (
      <ScrollView 
      style={{marginHorizontal: 10}}
      contentContainerStyle={{alignItems: 'flex-start'}}> 
        <Paragraph style={styles.text}>{dict.depression.paragraph1}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.paragraph2}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot1}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot2}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot3}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot4}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot5}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot6}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot7}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot8}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot9}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot10}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot11}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.dot12}</Paragraph>
        <Paragraph style={styles.text}>{dict.depression.paragraph3}</Paragraph>
      </ScrollView>
    );
  }