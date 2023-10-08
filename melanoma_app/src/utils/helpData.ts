import RawQuestions from "@assets/data/questions.json";
import RawTutorials from "@assets/data/tutorials.json";

import { TutorialsImages } from "./images";
import { QuestionMarkdownFiles } from "./markdowns";

import IQuestion from "@/models/question";
import ITutorial from "@/models/tutorial";

export function getQuestions(): IQuestion[] {
  return RawQuestions.map((question, index) => {
    let mdFile: undefined | number = undefined;
    if (question.markdownFile) {
      const fileName =
        question.markdownFile as keyof typeof QuestionMarkdownFiles;
      mdFile = QuestionMarkdownFiles[fileName];
    }
    return {
      ...question,
      id: index,
      markdownFile: mdFile,
    };
  });
}

export function getTutorials(): ITutorial[] {
  return RawTutorials.map((rawTutorial, index) => {
    const steps = rawTutorial.steps.map((step) => {
      return {
        title: step.title,
        body: step.body,
        backgroundColor: step.backgroundColor,
        image: TutorialsImages.get(step.image),
      };
    });
    return {
      id: index,
      title: rawTutorial.title,
      color: rawTutorial.color,
      icon: rawTutorial.icon,
      steps,
    };
  });
}
