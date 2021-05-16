import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Headline, Subheading, Paragraph } from 'react-native-paper';

export const CalenderInfo = () => {
  const styles = StyleSheet.create({
    text: {
      margin: 10,
      fontSize: 18,
      paddingTop: 10
    },
    image: {
      width: 212, 
      height: 420, 
      marginBottom: 20,
      marginTop: 5,
    },
    heading: {
      fontSize: 30,
    },
    subheading: {
      paddingTop: 15,
      fontSize: 22,
    },
    
  });

  return (
      <ScrollView 
      style={{marginHorizontal: 10}}
      contentContainerStyle={{alignItems: 'center'}}>
      <Headline style={styles.heading}>Manual för kalendern</Headline> 
        <Paragraph style={styles.text}>
          I kalendervyn kan du både planera in aktiviteter och se vilka aktiviteter som du redan har planerat in. 
          För att navigera till kalendervyn trycker du på kalendern som finns näst längst till höger i navigationsbaren.
        </Paragraph>
        <Subheading style={styles.subheading}>Startsidan</Subheading>
        <Paragraph style={styles.text}>
          När du har navigerat till kalendervyn möts du av en sida med aktiviteter som du har planerat in för den här
          veckan. Genom att trycka på aktiviteterna kan du ändra dem och genom att scrolla uppåt på sidan så kan du
          se dina tidigare inplanerade aktiviteter. 
        </Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/calendarStartscreen.png')}
        />
        <Subheading style={styles.subheading}>Planera en aktivitet</Subheading>
        <Paragraph style={styles.text}>
          För att planera en aktivitet så trycker du på plustecknet längst ner till höger och väljer sedan en ikon som bäst
          passar aktiviteten. Därefter kan du välja vilken dag och tid som aktiviteten ska genomföras. Tillsist kan du skriva
          vad du ska göra eller trycka på knappen "byt" som radar upp aktiviteterna som du har definierat under värderingar
          för just den ikonen. 
        </Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/calendarPlanning.png')}
        />
      </ScrollView>
      
  );
  }
