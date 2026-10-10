import React, {
    useEffect,
    useState
} from "react";

import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import api from "../services/api";


export default function EditScreen({
    route,
    navigation
}) {

    const { id } = route.params;


    const [title, setTitle] =
        useState("");

    const [author, setAuthor] =
        useState("");

    const [synopsis, setSynopsis] =
        useState("");

    const [content, setContent] =
        useState("");

    const [chapter, setChapter] =
        useState("");

    const [totalPages, setTotalPages] =
        useState("");


    useEffect(() => {

        api.get(`/posts/${id}`)
            .then((response) => {

                const data =
                    response.data.data;

                setTitle(data.title);

                setAuthor(data.author);

                setSynopsis(
                    data.synopsis || ""
                );

                setContent(data.content);

                setChapter(data.chapter);

                setTotalPages(
                    String(
                        data.totalPages
                    )
                );

            });

    }, []);


    const update = async () => {

        const formData =
            new FormData();


        formData.append(
            "title",
            title
        );

        formData.append(
            "author",
            author
        );

        formData.append(
            "synopsis",
            synopsis
        );

        formData.append(
            "content",
            content
        );

        formData.append(
            "chapter",
            chapter
        );

        formData.append(
            "totalPages",
            totalPages
        );


        try {

            await api.put(
                `/posts/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );


            Alert.alert(
                "Success",
                "Novel updated"
            );


            navigation.goBack();


        } catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

        }

    };


    return (

        <ScrollView
            style={styles.container}
        >

            <Text style={styles.heading}>
                Edit Novel
            </Text>


            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
            />

            <TextInput
                style={styles.input}
                value={author}
                onChangeText={setAuthor}
                placeholder="Author"
            />

            <TextInput
                style={styles.input}
                value={chapter}
                onChangeText={setChapter}
                placeholder="Chapter"
            />

            <TextInput
                style={styles.input}
                value={totalPages}
                onChangeText={setTotalPages}
                placeholder="Total pages"
                keyboardType="numeric"
            />

            <TextInput
                style={[
                    styles.input,
                    styles.large
                ]}
                value={synopsis}
                onChangeText={setSynopsis}
                multiline
            />

            <TextInput
                style={[
                    styles.input,
                    styles.content
                ]}
                value={content}
                onChangeText={setContent}
                multiline
            />


            <TouchableOpacity
                style={styles.button}
                onPress={update}
            >

                <Text style={styles.buttonText}>
                    Update Novel
                </Text>

            </TouchableOpacity>

        </ScrollView>

    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: "#f7f9fc",
    },

    heading: {
        fontSize: 27,
        fontWeight: "800",
        marginBottom: 25,
    },

    input: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        marginBottom: 14,
    },

    large: {
        height: 120,
        textAlignVertical: "top",
    },

    content: {
        height: 250,
        textAlignVertical: "top",
    },

    button: {
        backgroundColor: "#4169e1",
        padding: 17,
        borderRadius: 15,
        marginBottom: 80,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
    },

});