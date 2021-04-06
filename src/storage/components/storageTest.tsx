import React from 'react';
import { View } from 'react-native';
import { TextInput, Provider, Button } from 'react-native-paper';
import Storage from './..';

export default function StorageTest() {
    const [text, setText] = React.useState('');
    const [people, modifyPeople] = Storage.usePeople();
    const [settings, modifySettings] = Storage.useSettings();
    const [icons, modifyIcons] = Storage.useIcons();
    const [calendar, modifyCalendar] = Storage.useCalendar();
    const [values, modifyValues] = Storage.useValues();
    const [activities, modifyActivities] = Storage.useActivities();

    const addCalendarEntry = () => {
        modifyCalendar.add({
            date: "2021-03-12",
            start: "15:00",
            end: "16:00",
            text: "Hello",
            icon: "person",
            person: "Erik",
        });
    };

    const addValuesEntry = () => {
        modifyValues.addTopic("health", "working out");
        modifyValues.addEntry("health", "working out", {
            icon: "pumpingiron", 
            text: "sick gainz",
        });
    }

    const addActivity = () => {
        modifyActivities.add("2021-03-14", 0, {
            text: "sadness",
            icon: "crying",
            person: "Erik",
            meaningful: 10,
            entertaining: 0,
        });
    }

    return (
        <Provider>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button onPress={() => Storage.clearStorage()}>Clear (requires reload)</Button>

                <pre>Calendar: {JSON.stringify(calendar, null, 4)}</pre>
                <Button onPress={addCalendarEntry}>Add calendar entry</Button>

                <pre>Settings: {JSON.stringify(settings, null, 4)}</pre>
                <Button onPress={() => modifySettings.setNotifications(!settings.notifications)}>Toggle notifications</Button>

                <pre>People: {JSON.stringify(people, null, 4)}</pre>
                <TextInput
                    label="Person name"
                    value={text}
                    multiline={false}
                    mode="outlined"
                    onChangeText={text => {setText(text)}} />
                <Button onPress={() => modifyPeople.add(text)}>Add person</Button>

                <pre>Icons: {JSON.stringify(icons, null, 4)}</pre>
                <Button onPress={() => modifyIcons.swap(0, 1)}>Swap icons</Button>

                <pre>Values: {JSON.stringify(values, null, 4)}</pre>
                <Button onPress={addValuesEntry}>Add values entry (click twice)</Button>

                <pre>Activities: {JSON.stringify(activities, null, 4)}</pre>
                <Button onPress={addActivity}>Add activity entry</Button>
            </View>
        </Provider>
    );
}
