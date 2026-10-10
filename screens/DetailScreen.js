import React, {
    useEffect,
    useState
} from "react";

import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import {
    Ionicons
} from "@expo/vector-icons";

import api, {
    BASE_URL
} from "../services/api";


export default function DetailScreen({
    route,
    navigation
}) {

    const { id } = route.params;

    const [book, setBook] = useState(null);


    const getBook = async () => {

        try {

            const response =
                await api.get(`/posts/${id}`);

            setBook(response.data.data);

        } catch (error) {

            console.log(error.message);

        }

    };


    useEffect(() => {

        getBook();

    }, []);


    if (!book) {

        return (

            <View style={styles.loading}>

                <ActivityIndicator size="large" />

            </View>

        );

    }


    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <Image

                source={{
                    uri:
                        `${BASE_URL}/uploads/${book.image}`
                }}

                style={styles.cover}

            />


            <TouchableOpacity
                style={styles.back}
                onPress={() =>
                    navigation.goBack()
                }
            >

                <Ionicons
                    name="chevron-back"
                    size={25}
                    color="#fff"
                />

            </TouchableOpacity>


            <View style={styles.content}>

                <Text style={styles.title}>
                    {book.title}
                </Text>

                <Text style={styles.author}>
                    {book.author}
                </Text>


                <View style={styles.infoRow}>

                    <View style={styles.infoBox}>

                        <Text style={styles.infoLabel}>
                            Rating
                        </Text>

                        <Text style={styles.infoValue}>
                            ⭐ {book.rating}
                        </Text>

                    </View>


                    <View style={styles.infoBox}>

                        <Text style={styles.infoLabel}>
                            Pages
                        </Text>

                        <Text style={styles.infoValue}>
                            📖 {book.totalPages}
                        </Text>

                    </View>


                    <View style={styles.infoBox}>

                        <Text style={styles.infoLabel}>
                            Language
                        </Text>

                        <Text style={styles.infoValue}>
                            🇮🇩 ID
                        </Text>

                    </View>

                </View>


                <Text style={styles.chapterTitle}>
                    {book.chapter}
                </Text>


                <View style={styles.progressBackground}>

                    <View style={styles.progress} />

                </View>


                <Text style={styles.heading}>
                    Synopsis
                </Text>

                <Text style={styles.synopsis}>
                    {book.synopsis}
                </Text>


                <TouchableOpacity

                    style={styles.button}

                    onPress={() =>
                        navigation.navigate(
                            "Reader",
                            {
                                id: book.id
                            }
                        )
                    }

                >

                    <Text style={styles.buttonText}>
                        Continue Reading
                    </Text>

                </TouchableOpacity>

            </View>

        </ScrollView>

    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#eef3fb",
    },

    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    cover: {
        width: "100%",
        height: 350,
    },

    back: {
        position: "absolute",
        top: 55,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.4)",
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
    },

    content: {
        marginTop: -35,
        backgroundColor: "#fff",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 25,
    },

    title: {
        fontSize: 25,
        fontWeight: "800",
        textAlign: "center",
        color: "#1e293b",
    },

    author: {
        textAlign: "center",
        marginTop: 5,
        color: "#94a3b8",
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },

    infoBox: {
        width: "31%",
        padding: 14,
        backgroundColor: "#f7f9fc",
        borderRadius: 15,
    },

    infoLabel: {
        fontSize: 11,
        color: "#94a3b8",
    },

    infoValue: {
        marginTop: 6,
        fontWeight: "700",
    },

    chapterTitle: {
        marginTop: 25,
        fontWeight: "700",
    },

    progressBackground: {
        height: 7,
        backgroundColor: "#e2e8f0",
        marginTop: 10,
        borderRadius: 20,
    },

    progress: {
        width: "70%",
        height: 7,
        backgroundColor: "#4169e1",
        borderRadius: 20,
    },

    heading: {
        marginTop: 30,
        fontSize: 19,
        fontWeight: "800",
    },

    synopsis: {
        marginTop: 12,
        fontSize: 15,
        lineHeight: 24,
        color: "#64748b",
    },

    button: {
        marginTop: 35,
        backgroundColor: "#4169e1",
        padding: 17,
        borderRadius: 16,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "700",
    },

});