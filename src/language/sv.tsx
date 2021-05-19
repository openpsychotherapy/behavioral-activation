const sv = {
    languageName: 'Svenska',

    navigationLabelActivites: 'Registrera',     // Unused
    navigationLabelCalendar: 'Kalender',        // Unused
    navigationLabelValues: 'Värderingar',       // Unused
    navigationLabelInformation: 'Information',  // Unused

    activitiesButtonRateDay: 'Betygsätt dag',
    activitiesButtonRateDayModify: 'Ändra betyg',
    activitiesSliderRateDay: 'Dagens betyg',
    activitiesDialogConflict: 'En eller flera aktiviteter kommer att ersättas.',
    activitiesDialogYes: 'ok',

    valuesButtonRelations: 'Relationer',
    valuesButtonWork: 'Utbildning/Karriär',
    valuesButtonEnjoyment: 'Nöje/Intressen',
    valuesButtonHealth: 'Sinne, Kropp & Spirituellt',
    valuesButtonResponsibilities: 'Dagliga Ansvar',
    valuesButtonPeople: 'Stödpersoner',
    valuesDialogText: 'Är du säker på att du vill ta bort?',
    valuesDialogYes: 'Ja',
    valuesDialogNo: 'Avbryt',
    valuesPlaceholder: 'Skriv här',

    settingsSurfaceLanguage: 'Språk',
    settingsSurfaceNotifications: 'Notifikationer',
    settingsSurfaceIcons: 'Ikoner',
    settingsSurfaceIconCustomize: 'Anpassa',

    datePickerLabel: 'Välj ett datum',
    datePickerSaveLabel: 'Spara',
    datePickerStartLabel: 'Från',
    datePickerEndLabel: 'Till',
    datePickerEmptyLabel: '',  // Unused
    datePickerMoreLabel: '',   // Unused

    timePickerLabel: 'Tidsintervall',

    activityRegistratorTextInputLabel: 'Vad har du gjort?',
    activityRegistratorActivityDefaultChoice: 'Skriv text',
    activityRegistratorImporanceLabel: 'Meningsfullt',
    activityRegistratorEnjoymentLabel: 'Underhållande',

    calendarRegistratorTextInputLabel: 'Vad vill du planera in?',
    calendarRegistratorPersonLabel: 'Stödperson',

    choiceBasedTextInputChangeLabel: 'Byt',

    activiesSnackBarAdded: 'Aktiviteten lades till',

    activityHistoryRateDayLabel: 'Betygsätt dag',
    activityWeekHistoryRateDay: 'Dagens betyg',
    activityWeekHistoryNumberOfActivities: 'Antal aktiviteter',
    activityWeekHistoryTitleDay: 'Dagens historik',
    activityWeekHistoryTitleWeek: 'Aktivitetshistorik',


    informationCardActivityscreen: 'Aktiviteter',
    informationCardValuesscreen: 'Värderingar',
    informationCardCalenderscreen: 'Kalender',

    calendarNoItem: 'Inga planerade aktiviter idag.\nDrag neråt för att få tidigare planerade aktiviteter',


    informationCardBehaviouralactivation: 'Beteendeaktivering',

    routeNames: {
        Settings: 'Inställningar',
        History: 'Aktivitetshistorik',
        Activities: 'Registrera aktivitet',
        ActivityRegistration: 'Registrera aktivitet',
        RateDay: 'Betygsätt dag',
        WeekHistory: 'Veckans historik',
        Calendar: 'Kalender',
        CalendarRegistration: "Planera",
        StartScreenView: 'Värderingar',
        CategoryView: 'Värderingar',
        AddTopicView: 'Lägg till värdering',
        EntryView: 'Aktiviteter',
        ChooseEntryIconView: 'Välj ikon',
        AddEntryView: 'Lägg till aktivitet',
        Information: 'Information',
        BehaviouralActivation: 'Beteendeaktivering',

        ActivityInfo: 'Manual för registrering',
        ValuesInfo: 'Manual för värdering',
        CalenderInfo: 'Manual för kalendern',

        RegisterPlanning: 'Registrera planerad aktivitet',
        RegisterPlanningRate: 'Registrera planerad aktivitet',
    },
    activityInfo : {
        paragraph1: "I aktivitetsvyn kan du både registrera aktiviteter "+
        "och se vilka aktiviteter som du redan har registrerat. "+
        "För att komma till aktivitetsvyn så navigerar du till "+
        "plusstecknet som finns längst till vänster i navigationsbaren.",
        subheading1: "Startsidan",
        paragraph2: "När du har navigerat till aktivitetsvyn möts du "+
        "av en sida med 12 ikoner och 3 menyknappar som finns längst "+
        "ner på skärmen. De 12 ikonerna är dina favoritikoner och "+
        "dessa kan ändras under inställningar.",
        paragraph3: "Menyknappen som är längst till vänster tar upp "+
        "en lista på resten av ikonerna, som är där om du känner att "+
        "dina favoritikoner inte räcker till. Menyknappen som ligger "+
        "i mitten navigerar dig till en sida där du kan registrera "+
        "planerade aktiviteter. Menyknappen som är längst till höger "+
        "navigerar dig till en sida där du kan se en historik på dina "+
        "registrerade aktiviteter.",
        subheading2: "Registrera en aktivitet",
        paragraph4: "För att registrera en aktivitet så trycker du "+
        "bara på en ikon som bäst representerar den aktivitet som du "+
        "har gjort. Det tar dig till en vy där du kan bestämma dagen "+
        "och tiden som aktiviteten genomfördes. Här kan du också "+
        "beskriva aktiviteten mer detaljerat eller också koppla den "+
        "till en aktivitet som du har definierat i värderingsvyn. "+
        "Därefter graderar du hur meningsfull och underhållande "+
        "aktiviteten har varit.",
        subheading3: "Registrera planerade aktiviteter",
        paragraph5: "För att registrera en aktivitet som du redan "+
        "har planerat in så trycker du på menyknappen som ligger i "+
        "mitten på startsidan. Där finns en vy för att se dagens "+
        "inplanerade aktiviteter och genom att trycka på en så kan du "+
        "registrera den.",
        subheading4: "Historik",
        paragraph6: "I historiken finns alla aktiviteter som du har "+
        "registrerat där du på varje aktivitet också kan se hur du "+
        "graderade den. Här kan du också betygsätta hela din dag. "+
        "För att se historiken för en annan dag trycker du bara på "+
        "datumet längst upp på sidan, där kan du också se hur du "+
        "graderade dagarna."
    },
    valuesInfo: {
        paragraph1: "I värderingsvyn kan du lägga till värderingar, " +
        "stödpersoner och aktiviteter. För att komma till värderingsvyn "+
        "så navigerar du till hjärtat som finns näst längst till vänster "+
        "i navigationsbaren.",
        subheading1: "Startsidan",
        paragraph2: "När du har navigerat till värderingsvyn möts du av en "+
        "sida med 6 stycken olika knappar. De 5 översta är de kategorier "+
        "som dina värderingar kommer att definieras i och den sista knappen "+
        "innehåller de stödpersoner som du lägger till.",
        subheading2: "Lägga till en värdering",
        paragraph3: "För att lägga till en värdering så trycker du bara på "+
        "den kategorin som du vill lägga värderingen i. Det tar dig till en "+
        "vy där alla värderingar som du tidigare har lagt in under den här "+
        "kategorin finns och genom att trycka på plustecknet längst ner till "+
        "höger så kan du lägga till en värdering. För att radera en värdering "+ 
        "så trycker du och håller in på värderingen som du vill radera.",
        subheading3: "Lägga till en aktivitet",
        paragraph4: "Alla värderingar kan i sin tur varar kopplade till flera "+
        "aktiviteter och dessa ser du genom att trycka på respektive värdering. "+
        "För att lägga till en aktivitet trycker du sedan på plusstecknet längst "+
        "ner till höger och sedan på den ikon som bäst representerar aktiviteten. "+
        "För att radera en aktivitet så trycker du och håller in på aktiviteten "+ 
        "som du vill radera.",
        subheading4: "Lägga till en stödperson",
        paragraph5: "Under knappen stödpersoner finns alla personer som du har "+
        "lagt till. För att lägga till en stödperson så trycker du på "+
        "plustecknet längst ner till höger. För att radera en stödperson så trycker "+ 
        "du och håller in på stödpersonen som du vill radera."
    },
    calendarInfo: {
        paragraph1: "I kalendervyn kan du både planera in aktiviteter och se "+
        "vilka aktiviteter som du redan har planerat in. För att navigera till "+
        "kalendervyn trycker du på kalendern som finns näst längst till höger i "+
        "navigationsbaren.",
        subheading1: "Startsidan",
        paragraph2: "När du har navigerat till kalendervyn möts du av en sida med "+
        "aktiviteter som du har planerat in för den här veckan. Genom att trycka på "+
        "aktiviteterna kan du ändra dem och genom att scrolla uppåt på sidan så kan "+
        "du se dina tidigare inplanerade aktiviteter.",
        subheading2: "Planera en aktivitet",
        paragraph3: "För att planera en aktivitet så trycker du på plustecknet "+
        "längst ner till höger och väljer sedan en ikon som bäst passar aktiviteten. "+
        "Därefter kan du välja vilken dag och tid som aktiviteten ska genomföras. "+
        "Tillsist kan du skriva vad du ska göra eller trycka på knappen \"byt\" som "+
        "radar upp aktiviteterna som du har definierat under värderingar för just den "+
        "ikonen."
    }
}

export default sv;
