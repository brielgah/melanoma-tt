import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Questions from "@/components/home/help/questions";
import TutorialsOverview from "@/components/home/help/tutorialsOverview";
import Search from "@/components/searchbar";
import Section from "@/components/section";
import Styles from "@/styles";
import { getQuestions } from "@/utils/helpData";

const Help = () => {
  const rawQuestions = getQuestions();
  const [searchFilter, setSearchFilter] = useState("");
  const [questions, setQuestions] = useState(rawQuestions);

  const onSearchChanged = (search: string) => {
    search = search.toLowerCase();
    setSearchFilter(search);
    const filteredQuestions = rawQuestions.filter((question) => {
      if (search === "") return true;
      const title = question.title.toLowerCase();
      const body = question.body.toLowerCase();
      return title.includes(search) || body.includes(search);
    });
    setQuestions(filteredQuestions);
  };

  const SearchSection = () => {
    return TutorialsOverview({ searchFilter });
  };

  const QuestionsSection = () => {
    return Questions({ questions });
  };

  return (
    <View style={[styles.container, Styles.flexContainer]}>
      <Search
        placeholder="Ingresa una palabra clave"
        onChangeText={onSearchChanged}
      />
      <View style={styles.searchContainer}>
        <Section title="¿Cómo te podemos ayudar?" body={SearchSection} />
      </View>
      <View style={styles.questionsContainer}>
        <Section title="Preguntas frecuentes" body={QuestionsSection} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // minHeight: 1000,
  },
  searchContainer: {
    flex: 1,
    maxHeight: 250,
  },
  questionsContainer: {
    flex: 2.5,
  },
});

export default Help;
