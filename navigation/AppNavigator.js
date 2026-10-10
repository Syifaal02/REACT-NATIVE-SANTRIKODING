import React from "react";

import {
    NavigationContainer
} from "@react-navigation/native";

import {
    createNativeStackNavigator
} from "@react-navigation/native-stack";

import {
    createBottomTabNavigator
} from "@react-navigation/bottom-tabs";

import {
    Ionicons
} from "@expo/vector-icons";


import HomeScreen
    from "../screens/HomeScreen";

import DetailScreen
    from "../screens/DetailScreen";

import ReaderScreen
    from "../screens/ReaderScreen";

import ManageScreen
    from "../screens/ManageScreen";

import CreateScreen
    from "../screens/CreateScreen";

import EditScreen
    from "../screens/EditScreen";


const Stack =
    createNativeStackNavigator();

const Tab =
    createBottomTabNavigator();


function MainTabs() {

    return (

        <Tab.Navigator

            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarActiveTintColor:
                    "#4169e1",

                tabBarInactiveTintColor:
                    "#94a3b8",

                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 8,
                },

                tabBarIcon: ({
                    color,
                    size
                }) => {

                    let iconName;


                    if (
                        route.name ===
                        "Home"
                    ) {

                        iconName = "home";

                    } else {

                        iconName =
                            "library-outline";

                    }


                    return (

                        <Ionicons
                            name={iconName}
                            size={size}
                            color={color}
                        />

                    );

                },

            })}

        >

            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />

            <Tab.Screen
                name="Library"
                component={ManageScreen}
            />

        </Tab.Navigator>

    );

}


export default function AppNavigator() {

    return (

        <NavigationContainer>

            <Stack.Navigator

                screenOptions={{
                    headerShown: false,
                }}

            >

                <Stack.Screen
                    name="Main"
                    component={MainTabs}
                />

                <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                />

                <Stack.Screen
                    name="Reader"
                    component={ReaderScreen}
                />

                <Stack.Screen
                    name="Create"
                    component={CreateScreen}
                />

                <Stack.Screen
                    name="Edit"
                    component={EditScreen}
                />

            </Stack.Navigator>

        </NavigationContainer>

    );

}