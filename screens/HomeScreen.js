import React, {
    useCallback,
    useState
} from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
    Ionicons
} from "@expo/vector-icons";

import {
    useFocusEffect
} from "@react-navigation/native";

import api from "../services/api";

import BookCard from "../components/BookCard";


export default function HomeScreen({ navigation }) {

    const [books, setBooks] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);


    const getBooks = async () => {

        try {

            setLoading(true);

            const response = await api.get("/posts");

            setBooks(response.data.data);

        } catch (error) {

            console.log(
                "GET BOOK ERROR:",
                error.message
            );

        } finally {

            setLoading(false);

        }

    };


    useFocusEffect(

        useCallback(() => {

            getBooks();

        }, [])

    );


    const filteredBooks = books.filter((item) =>

        item.title
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

    );


    const openDetail = (id) => {

        navigation.navigate("Detail", { id });

    };


    return (

        <SafeAreaView style={styles.safeArea}>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.container}>

                    <View style={styles.header}>

                        <View>

                            <Text style={styles.logo}>
                                📚 Studiall
                            </Text>

                            <Text style={styles.subtitle}>
                                Discover your next story
                            </Text>

                        </View>

                        <TouchableOpacity
                            style={styles.notification}
                        >

                            <Ionicons
                                name="notifications-outline"
                                size={22}
                                color="#334155"
                            />

                        </TouchableOpacity>

                    </View>


                    <View style={styles.searchBox}>

                        <Ionicons
                            name="search"
                            size={20}
                            color="#9ca3af"
                        />

                        <TextInput
                            placeholder="Search novel..."
                            value={search}
                            onChangeText={setSearch}
                            style={styles.searchInput}
                        />

                    </View>


                    <View style={styles.sectionHeader}>

                        <Text style={styles.sectionTitle}>
                            My Books
                        </Text>

                        <Text style={styles.seeAll}>
                            See All
                        </Text>

                    </View>


                    {
                        loading
                            ?

                            <ActivityIndicator
                                size="large"
                                style={{
                                    marginVertical: 40
                                }}
                            />

                            :

                            <FlatList
                                horizontal
                                data={filteredBooks}
                                keyExtractor={(item) =>
                                    item.id.toString()
                                }
                                renderItem={({ item }) => (

                                    <BookCard
                                        book={item}
                                        onPress={() =>
                                            openDetail(item.id)
                                        }
                                    />

                                )}
                                showsHorizontalScrollIndicator={false}
                            />

                    }


                    <Text style={[
                        styles.sectionTitle,
                        {
                            marginTop: 30
                        }
                    ]}>
                        Continue Reading
                    </Text>


                    {
                        books.length > 0 && (

                            <TouchableOpacity

                                style={styles.continueCard}

                                onPress={() =>
                                    navigation.navigate(
                                        "Reader",
                                        {
                                            id: books[0].id
                                        }
                                    )
                                }

                            >

                                <View style={{
                                    flex: 1
                                }}>

                                    <Text style={styles.continueTitle}>
                                        {books[0].title}
                                    </Text>

                                    <Text style={styles.chapter}>
                                        {books[0].chapter}
                                    </Text>

                                    <View style={styles.progressBackground}>

                                        <View
                                            style={[
                                                styles.progress,
                                                {
                                                    width: "65%"
                                                }
                                            ]}
                                        />

                                    </View>

                                    <Text style={styles.progressText}>
                                        Continue reading
                                    </Text>

                                </View>

                            </TouchableOpacity>

                        )
                    }


                    <Text style={[
                        styles.sectionTitle,
                        {
                            marginTop: 30
                        }
                    ]}>
                        New Arrival
                    </Text>


                    <FlatList
                        horizontal
                        data={books}
                        keyExtractor={(item) =>
                            `new-${item.id}`
                        }
                        renderItem={({ item }) => (

                            <BookCard
                                book={item}
                                onPress={() =>
                                    openDetail(item.id)
                                }
                            />

                        )}
                        showsHorizontalScrollIndicator={false}
                    />

                </View>

            </ScrollView>

        </SafeAreaView>

    );

}


const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#f7f9fc",
    },

    container: {
        padding: 22,
        paddingTop: 20,
        paddingBottom: 100,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    logo: {
        fontSize: 23,
        fontWeight: "800",
        color: "#1e293b",
    },

    subtitle: {
        fontSize: 13,
        color: "#94a3b8",
        marginTop: 4,
    },

    notification: {
        width: 42,
        height: 42,
        backgroundColor: "#fff",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },

    searchBox: {
        marginTop: 25,
        height: 52,
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
    },

    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: "#1e293b",
        marginBottom: 15,
    },

    seeAll: {
        color: "#4263eb",
        fontWeight: "600",
    },

    continueCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
    },

    continueTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: "#1e293b",
    },

    chapter: {
        color: "#94a3b8",
        marginTop: 6,
    },

    progressBackground: {
        height: 7,
        backgroundColor: "#e2e8f0",
        borderRadius: 10,
        marginTop: 18,
    },

    progress: {
        height: 7,
        borderRadius: 10,
        backgroundColor: "#4169e1",
    },

    progressText: {
        marginTop: 12,
        color: "#4169e1",
        fontWeight: "700",
    },

});