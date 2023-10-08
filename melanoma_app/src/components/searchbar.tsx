import { useState } from "react";
import { SearchBar } from "react-native-elements";

import ColorPallete from "../colorPallete";

interface SearchProps {
  search?: string;
  placeholder: string;
  onChangeText?: (search: string) => void;
}

const Search = (props: SearchProps) => {
  const [value, setValue] = useState(props.search || "");

  const updateSearch = (search: string) => {
    setValue(search);
    props.onChangeText?.(search);
  };

  return (
    <SearchBar
      value={value}
      containerStyle={{ backgroundColor: ColorPallete.background.ligthbg }}
      cancelButtonProps={{ color: ColorPallete.text.ligthbg.subtitle }}
      onChangeText={updateSearch}
      platform="ios"
      placeholder={props.placeholder}
    />
  );
};

export default Search;
