import React, {
    useState
} from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    Image,
} from "react-native";

import * as ImagePicker
    from "expo-image-picker";

import api from "../services/api";


export default function CreateScreen({
    navigation
}) {

    const [title, setTitle] =
        useState("");

    const [author, setAuthor] =
        useState("");

    const [synopsis, setSynopsis] =
        useState("");

    const [content, setContent] =
        useState("");

    const [chapter, setChapter] =
        useState("Chapter 1");

    const [totalPages, setTotalPages] =
        useState("1");

    const [image, setImage] =
        useState(null);


    const pickImage = async () => {

        const result =
            await ImagePicker.launchImageLibraryAsync({

                mediaTypes:
                    ["images"],

                allowsEditing: true,

                quality: 0.8,

            });


        if (!result.canceled) {

            setImage(
                result.assets[0]
            );

        }

    };


    const save = async () => {

        if (
            !title ||
            !author ||
            !content ||
            !image
        ) {

            Alert.alert(
                "Validation",
                "Please complete required fields"
            );

            return;

        }


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


        formData.append(
            "image",
            {
                uri: image.uri,
                name:
                    image.fileName ||
                    "cover.jpg",
                type:
                    image.mimeType ||
                    "image/jpeg",
            }
        );


        try {

            await api.post(
                "/posts",
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
                "Novel successfully added"
            );


            navigation.goBack();


        } catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

            Alert.alert(
                "Error",
                "Failed to add novel"
            );

        }

    };


    return (

        <ScrollView
            style={styles.container}
        >

            <Text style={styles.heading}>
                Add Novel
            </Text>


            <TouchableOpacity
                style={styles.coverBox}
                onPress={pickImage}
            >

                {
                    image
                        ?

                        <Image
                            source={{
                                uri: image.uri
                            }}
                            style={styles.preview}
                        />

                        :

                        <Text>
                            + Select Cover
                        </Text>
                }

            </TouchableOpacity>


            <TextInput
                placeholder="Novel title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />


            <TextInput
                placeholder="Author"
                value={author}
                onChangeText={setAuthor}
                style={styles.input}
            />


            <TextInput
                placeholder="Chapter"
                value={chapter}
                onChangeText={setChapter}
                style={styles.input}
            />


            <TextInput
                placeholder="Total pages"
                value={totalPages}
                onChangeText={setTotalPages}
                keyboardType="numeric"
                style={styles.input}
            />


            <TextInput
                placeholder="Synopsis"
                value={synopsis}
                onChangeText={setSynopsis}
                multiline
                style={[
                    styles.input,
                    styles.largeInput
                ]}
            />


            <TextInput
                placeholder="Novel content"
                value={content}
                onChangeText={setContent}
                multiline
                style={[
                    styles.input,
                    styles.contentInput
                ]}
            />


            <TouchableOpacity
                style={styles.button}
                onPress={save}
            >

                <Text style={styles.buttonText}>
                    Save Novel
                </Text>

            </TouchableOpacity>

        </ScrollView>

    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f7f9fc",
        padding: 20,
        paddingTop: 60,
    },

    heading: {
        fontSize: 27,
        fontWeight: "800",
        marginBottom: 25,
    },

    coverBox: {
        height: 220,
        backgroundColor: "#e2e8f0",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        overflow: "hidden",
    },

    preview: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    input: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 14,
        borderRadius: 14,
    },

    largeInput: {
        height: 120,
        textAlignVertical: "top",
    },

    contentInput: {
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
        textAlign: "center",
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },

});