import { Asset } from "expo-asset";
import { useEffect, useState } from "react";
import { Linking } from "react-native";
import Markdown from "react-native-markdown-package";

import { MarkdownStyles } from "@/styles";

interface MarkdownViewProps {
  source?: string;
  asset?: number;
}

const MarkdownView = (props: MarkdownViewProps) => {
  const [mdSource, setMdSource] = useState(props.source ?? "");

  const fetchMdSourceFile = async (asset: number) => {
    const file = Asset.fromModule(asset);
    await file.downloadAsync();
    const uri = await fetch(file.uri);
    const txt = await uri.text();
    setMdSource(txt);
  };

  useEffect(() => {
    if (props.asset) {
      fetchMdSourceFile(props.asset);
    }
  }, []);

  return (
    <Markdown
      styles={MarkdownStyles}
      onLink={(url: string) => Linking.openURL(url)}
    >
      {mdSource}
    </Markdown>
  );
};

export default MarkdownView;
