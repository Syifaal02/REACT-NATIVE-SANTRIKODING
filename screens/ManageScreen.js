import React, {
    useCallback,
    useState
} from "react";

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from "react-native";

import {
    useFocusEffect
} from "@react-navigation/native";

import {
    Ionicons
} from "@expo/vector-icons";

import api, {
    BASE_URL
} from "../services/api";


export default function ManageScreen({
    navigation
}) {

    const [books, setBooks] =
        useState([]);


    const getBooks = async () => {

        const response =
            await api.get("/posts");

        setBooks(
            response.data.data
        );

    };


    useFocusEffect(

        useCallback(() => {

            getBooks();

        }, [])

    );


    const remove = (id) => {

        Alert.alert(

            "Delete Novel",

            "Are you sure?",

            [

                {
                    text: "Cancel"
                },

                {

                    text: "Delete",

                    onPress: async () => {

                        await api.delete(
                            `/posts/${id}`
                        );

                        getBooks();

                    },

                },

            ]

        );

    };


    return (

        <View style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.title}>
                    Manage Novels
                </Text>

                <TouchableOpacity

                    style={styles.add}

                    onPress={() =>
                        navigation.navigate(
                            "Create"
                        )
                    }

                >

                    <Ionicons
                        name="add"
                        size={28}
                        color="#fff"
                    />

                </TouchableOpacity>

            </View>


            <FlatList

                data={books}

                keyExtractor={(item) =>
                    item.id.toString()
                }

                renderItem={({ item }) => (

                    <View style={styles.card}>

                        <Image

                            source={{
                                uri:
                                    `${BASE_URL}/uploads/${item.image}`
                            }}

                            style={styles.image}

                        />


                        <View style={{
                            flex: 1
                        }}>

                            <Text style={styles.bookTitle}>
                                {item.title}
                            </Text>

                            <Text style={styles.author}>
                                {item.author}
                            </Text>

                        </View>


                        <TouchableOpacity

                            onPress={() =>
                                navigation.navigate(
                                    "Edit",
                                    {
                                        id: item.id
                                    }
                                )
                            }

                        >

                            <Ionicons
                                name="create-outline"
                                size={24}
                                color="#4169e1"
                            />

                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() =>
                                remove(item.id)
                            }
                        >

                            <Ionicons
                                name="trash-outline"
                                size={24}
                                color="#e74c3c"
                            />

                        </TouchableOpacity>

                    </View>

                )}

            />

        </View>

    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: "#f7f9fc",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
    },

    add: {
        width: 45,
        height: 45,
        backgroundColor: "#4169e1",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginBottom: 14,
        padding: 12,
        borderRadius: 17,
        alignItems: "center",
        gap: 13,
    },

    image: {
        width: 55,
        height: 75,
        borderRadius: 8,
    },

    bookTitle: {
        fontWeight: "700",
        fontSize: 15,
    },

    author: {
        marginTop: 5,
        color: "#94a3b8",
    },

});