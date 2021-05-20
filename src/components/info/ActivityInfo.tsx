import React from 'react';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Subheading, Paragraph } from 'react-native-paper';
import {styles} from './Styles';
import { useTranslation } from 'language/LanguageProvider';

export const ActivityInfo = () => {
  const dict = useTranslation();

  return (
      <ScrollView 
      style={{marginHorizontal: 10}}
      contentContainerStyle={{alignItems: 'center'}}> 
        <Paragraph style={styles.text}>{dict.activityInfo.paragraph1}</Paragraph>
        <Subheading style={styles.subheading}>{dict.activityInfo.subheading1}</Subheading>
        <Paragraph style={styles.text}>{dict.activityInfo.paragraph2}</Paragraph>
        <Paragraph style={styles.text}>{dict.activityInfo.paragraph3}</Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/activityStartscreen.png')}
        />
        <Subheading style={styles.subheading}>{dict.activityInfo.subheading2}</Subheading>
        <Paragraph style={styles.text}>{dict.activityInfo.paragraph4}</Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/activityRegistrator.png')}
        />
        <Subheading style={styles.subheading}>{dict.activityInfo.subheading3}</Subheading>
        <Paragraph style={styles.text}>{dict.activityInfo.paragraph5}</Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/activityPlanning.png')}
        />
        <Subheading style={styles.subheading}>{dict.activityInfo.subheading4}</Subheading>
        <Paragraph style={styles.text}>{dict.activityInfo.paragraph6}</Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/activityHistory.png')}
        />
        
      </ScrollView>
      
  );
}
