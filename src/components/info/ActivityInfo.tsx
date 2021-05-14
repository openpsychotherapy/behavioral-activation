import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Headline, Subheading, Paragraph } from 'react-native-paper';

export const ActivityInfo = () => {
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
      <Headline style={styles.heading}>Manual för registrering</Headline> 
        <Paragraph style={styles.text}>
          I aktivitesvyn kan du både registrera aktiviteter och se vilka aktiviteter som du redan har registrerat. 
          För att komma till aktivitetsvyn så navigerar du till plusstecknet som finns längst till vänster i navigationsbaren.
        </Paragraph>
        <Subheading style={styles.subheading}>Startsidan</Subheading>
        <Paragraph style={styles.text}>
          När du har navigerat till aktivitetsvyn möts du av en sida med 12 ikoner och 3 menyknappar som finns längst ner på 
          skärmen. De 12 ikonerna är dina favoritikoner och dessa kan ändras under iställningar. 
        </Paragraph>
        <Paragraph style={styles.text}>
          Menyknappen som är längst till vänster innehåller massor av ikoner som är där om du känner att dina favoritikoner 
          inte räcker till. Menyknappen som ligger i mitten navigerar dig till en sida där du kan registrera planerade 
          aktiviteter, mer om det senare. Menyknappen som är längst till höger navigerar dig till en sida där du kan se en 
          historik på dina registrerade aktiviteter, mer om det senare. 
        </Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/activityStartscreen.png')}
        />
        <Subheading style={styles.subheading}>Registrera en aktivitet</Subheading>
        <Paragraph style={styles.text}>
          För att registrera en aktivitet så trycker du bara på en ikon som bäst representerar den aktivitet som du har gjort. 
          Det tar dig till en vy där du kan bestämma dagen och tiden som aktiviteten genomfördes. Här kan du också, om du vill,
          beskriva aktiviteten mer detaljerat eller också koppla den till en aktivitet som du har definierat i värderingsvyn.
          Därefter graderar du hur meningsfull och underhållande aktiviteten har varit.
        </Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/activityRegistrator.png')}
        />
        <Subheading style={styles.subheading}>Registrera planerade aktiviteter</Subheading>
        <Paragraph style={styles.text}>
          För att registrera en aktivitet som du redan har planerat in så trycker du bara på menyknappen som ligger i mitten på
          startsidan. Där finns en vy för att se dagens inplanerade aktiviteter och bara genom att trycka på dem så kan du
          registrera dem.
        </Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/activityPlanning.png')}
        />
        <Subheading style={styles.subheading}>Historik</Subheading>
        <Paragraph style={styles.text}>
          I historiken finns alla aktiviteter som du har registrerat där du på varje aktivitet också kan se hur du graderade den. 
          Här kan du också betygsätta hela din dag. För att se historiken för en annan dag trycker du bara på kalendern längst
          upp på sidan, där kan du också se hur du graderade dagarna. 
        </Paragraph>
        <Image
          style={styles.image}
          source={require('../../images/activityHistory.png')}
        />
        
      </ScrollView>
      
  );
}
