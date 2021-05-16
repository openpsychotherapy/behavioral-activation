import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Headline, Subheading, Paragraph } from 'react-native-paper';

export const ValuesInfo = () => {
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
      <Headline style={styles.heading}>Manual för värdering</Headline> 
        <Paragraph style={styles.text}>
          I värderingsvyn kan du lägga till värderingar, stödpersoner och aktiviteter. För att komma till värderingsvyn 
          så navigerar du till hjärtat som finns näst längst till vänster i navigationsbaren.
        </Paragraph>
        <Subheading style={styles.subheading}>Startsidan</Subheading>
        <Paragraph style={styles.text}>
          När du har navigerat till värderingsvyn möts du av en sida med 6 stycken olika knappar. De 5 översta är 
          de kategorier som dina värderingar kommer att definieras i och den sista knappen innehåller de stödpersoner
          som du lägger till. 
        </Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/valuesStartscreen.png')}
        />
        <Subheading style={styles.subheading}>Lägga till en värdering</Subheading>
        <Paragraph style={styles.text}>
          För att lägga till en värdering så trycker du bara på den kategorin som du vill lägga värderingen i. Det tar dig
          till en vy där alla värderingar som du tidigare har lagt in under den här kategorin finns och genom att trycka på 
          plustecknet längst ner till höger så kan du lägga till en värdering. 
        </Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/valuesRelationship.png')}
        />
        <Subheading style={styles.subheading}>Lägga till en aktivitet</Subheading>
        <Paragraph style={styles.text}>
          Alla värderingar kan i sin tur varar kopplade till flera aktiviteter och dessa ser du genom att trycka på respektive
          värdering. För att lägga till en aktivitet trycker du sedan på plusstecknet längst ner till höger och sedan på
          den ikon som bäst representerar aktiviteten.
        </Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/valuesActivities.png')}
        />
        <Subheading style={styles.subheading}>Lägga till stödperson</Subheading>
        <Paragraph style={styles.text}>
          Under knappen stödpersoner finns alla personer som du har lagt till. För att lägga till en stödperson så trycker
          du på plustecknet längst ner till höger. 
        </Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/valuesSupport.png')}
        />
        
      </ScrollView>
      
  );
  }
