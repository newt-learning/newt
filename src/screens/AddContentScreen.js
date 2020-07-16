import React from "react";
import { View, StatusBar, StyleSheet, FlatList } from "react-native";
// API
import { useFetchNewtContent } from "../api/newtContent";
// Components
import { H1 } from "../components/shared/Headers";
import ShelfContentCard from "../components/MyLibrary/ShelfContentCard";
import LoadingSkeletonCard from "../components/shared/LoadingSkeletonCard";
import ContentButton from "../components/ContentButton";
// Styling
import { GRAY_5, OFF_WHITE, WHITE, RUBY, ORANGE } from "../design/colors";
// Helpers
import { handleContentNavigation } from "../helpers/screenHelpers";

const AddContentScreen = ({ navigation }) => {
  const { data: newtContentData } = useFetchNewtContent();

  return (
    <View style={styles.container}>
      <H1 style={styles.title}>Discover</H1>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 15,
          paddingRight: 5,
        }}
        data={newtContentData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ShelfContentCard
            title={item.name}
            thumbnailUrl={item.thumbnailUrl}
            type={item.type}
            onPress={() =>
              handleContentNavigation(item, navigation, {
                comingFromDiscoverSection: true,
              })
            }
          />
        )}
        ListEmptyComponent={
          <>
            <LoadingSkeletonCard backgroundColor={OFF_WHITE} />
            <LoadingSkeletonCard backgroundColor={OFF_WHITE} />
          </>
        }
      />
      <StatusBar barStyle="dark-content" backgroundColor={OFF_WHITE} />
      <View style={styles.contentContainer}>
        <ContentButton
          text="Add a book"
          onPress={() => navigation.navigate("Add Book")}
          buttonStyle={StyleSheet.compose(styles.btn, styles.bookBtn)}
          textStyle={styles.btnText}
        />
        <ContentButton
          text="Add a video"
          onPress={() => navigation.navigate("AddVideo")}
          buttonStyle={StyleSheet.compose(styles.btn, styles.videoBtn)}
          textStyle={styles.btnText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5,
  },
  title: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 15,
  },
  btn: {
    marginVertical: 10,
  },
  bookBtn: {
    backgroundColor: RUBY,
  },
  videoBtn: {
    backgroundColor: ORANGE,
  },
  btnText: {
    color: WHITE,
  },
});

export default AddContentScreen;
