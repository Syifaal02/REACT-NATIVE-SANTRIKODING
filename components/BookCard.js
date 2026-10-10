import React from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { BASE_URL } from "../services/api";


export default function BookCard({ book, onPress }) {

    return (

        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >

            <Image
                source={{
                    uri: `${BASE_URL}/uploads/${book.image}`,
                }}
                style={styles.cover}
            />

            <Text
                style={styles.title}
                numberOfLines={1}
            >
                {book.title}
            </Text>

            <Text
                style={styles.author}
                numberOfLines={1}
            >
                {book.author}
            </Text>

            <View style={styles.rating}>

                <Text style={styles.star}>
                    ★
                </Text>

                <Text style={styles.ratingText}>
                    {book.rating}
                </Text>

            </View>

        </TouchableOpacity>

    );

}


const styles = StyleSheet.create({

    container: {
        width: 135,
        marginRight: 16,
    },

    cover: {
        width: 135,
        height: 190,
        borderRadius: 14,
        backgroundColor: "#ddd",
    },

    title: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "700",
        color: "#1f2937",
    },

    author: {
        marginTop: 3,
        fontSize: 12,
        color: "#8a94a6",
    },

    rating: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "center",
    },

    star: {
        color: "#f3a712",
        marginRight: 4,
    },

    ratingText: {
        fontSize: 12,
        color: "#555",
    },

});