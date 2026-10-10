import React, {
    useEffect,
    useState
} from "react";

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import {
    Ionicons
} from "@expo/vector-icons";

import api from "../services/api";


export default function ReaderScreen({
    route,
    navigation
}) {

    const { id } = route.params;

    const [book, setBook] =
        useState(null);


    useEffect(() => {

        api.get(`/posts/${id}`)
            .then((response) => {

                setBook(
                    response.data.data
                );

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);


    if (!book) {

        return (

            <View style={styles.loading}>

                <ActivityIndicator size="large" />

            </View>

        );

    }


    return (

        <View style={styles.container}>

            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() =>
                        navigation.goBack()
                    }
                >

                    <Ionicons
                        name="chevron-back"
                        size={25}
                        color="#1e293b"
                    />

                </TouchableOpacity>


                <View style={{
                    alignItems: "center"
                }}>

                    <Text style={styles.headerTitle}>
                        {book.title}
                    </Text>

                    <Text style={styles.headerChapter}>
                        {book.chapter}
                    </Text>

                </View>


                <Ionicons
                    name="ellipsis-horizontal"
                    size={23}
                />

            </View>


            <ScrollView
                contentContainerStyle={
                    styles.reader
                }
                showsVerticalScrollIndicator={false}
            >

                <Text style={styles.chapter}>
                    {book.chapter}
                </Text>


                <Text style={styles.content}>
                    {book.content}
                </Text>

            </ScrollView>


            <View style={styles.bottom}>

                <Ionicons
                    name="star-outline"
                    size={23}
                />

                <Ionicons
                    name="chatbubble-outline"
                    size={23}
                />

                <Text style={styles.page}>
                    1 of {book.totalPages}
                </Text>

                <Ionicons
                    name="arrow-forward"
                    size={24}
                    color="#4169e1"
                />

            </View>

        </View>

    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    header: {
        paddingTop: 55,
        paddingHorizontal: 20,
        paddingBottom: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#eee",
    },

    headerTitle: {
        fontSize: 15,
        fontWeight: "700",
    },

    headerChapter: {
        fontSize: 11,
        color: "#94a3b8",
        marginTop: 3,
    },

    reader: {
        padding: 25,
        paddingBottom: 100,
    },

    chapter: {
        fontSize: 14,
        color: "#4169e1",
        fontWeight: "700",
        marginBottom: 20,
    },

    content: {
        fontSize: 18,
        lineHeight: 32,
        color: "#334155",
        textAlign: "justify",
    },

    bottom: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        width: "100%",
        height: 70,
        borderTopWidth: 1,
        borderColor: "#eee",
        paddingHorizontal: 25,
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
    },

    page: {
        marginLeft: "auto",
        color: "#64748b",
    },

});