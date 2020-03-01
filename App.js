/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableHighlight,
    View,
    Text,
    StatusBar,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {AlertHelper} from './src/components/common/AlertHelper';
import {AlertNotification} from './src/components/common/AlertNotification';
import * as firebase from "react-native-firebase";

const App: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    <View style={styles.body}>
                        <DropdownAlert
                            defaultContainer={{padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row'}}
                            ref={ref => AlertHelper.setDropDown(ref)}
                            onClose={() => {
                                AlertHelper.invokeOnClose();
                                StatusBar.setBackgroundColor(Colors.statusBar, true);
                            }}/>
                        <DropdownAlert
                            defaultContainer={styles.notification}
                            ref={ref => AlertNotification.setDropDown(ref)}
                            infoColor={Colors.white}
                            imageStyle={{
                                width: Dimensions.get('window').width - 32,
                                height: Dimensions.get('window').width - 32,
                                marginLeft: 8,
                            }}
                            contentContainerStyle={styles.notification_container_style}
                            onClose={() => {
                                AlertNotification.invokeOnClose();
                                StatusBar.setBackgroundColor(Colors.statusBar, true);
                            }}/>
                        <View style={styles.sectionContainer}>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => {
                                    AlertNotification.show('notification', 'Error', 'Hi,');
                                    // AlertHelper.show('warn', 'Error', "Hi,");
                                    firebase.messaging().subscribeToTopic('notification');
                                    firebase.messaging().getToken()
                                        .then(fcmToken => {
                                            if (fcmToken) {
                                             console.log("fcmToken",fcmToken)
                                            } else {
                                                // user doesn't have a device token yet
                                                // Alert.alert("fcmToken", "user doesn't have a device token yet");
                                            }
                                        });
                                }}>
                                <Text style={styles.sectionTitle}>Step One</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.sectionContainer}>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => {
                                    AlertNotification.show('notification', 'Error', 'Hi,');
                                    // AlertHelper.show('warn', 'Error', "Hi,");
                                    firebase.messaging().unsubscribeFromTopic('notification');
                                    firebase.messaging().getToken()
                                        .then(fcmToken => {
                                            if (fcmToken) {
                                             console.log("fcmToken",fcmToken)
                                            } else {
                                                // user doesn't have a device token yet
                                                // Alert.alert("fcmToken", "user doesn't have a device token yet");
                                            }
                                        });
                                }}>
                                <Text style={styles.sectionTitle}>Step One</Text>
                            </TouchableHighlight>
                        </View>
                        <LearnMoreLinks/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    notification_container_style: {
        flexDirection: 'column',
        backgroundColor: Colors.white,
    },
    notification: {
        padding: 8,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: Colors.white,
        flexDirection: 'row',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
