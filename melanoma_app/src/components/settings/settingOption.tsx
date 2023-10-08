import { Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ColorPallete from "../../colorPallete";
import Styles from "../../styles";
import SettingsOptions from "../../utils/SettingsOptions";
import MarkdownView from "../markdownView";

interface SettingOptionLinkProps {
  name: string;
  icon: React.ElementType;
  option: SettingsOptions;
}

export const SettingOptionLink = (props: SettingOptionLinkProps) => {
  const Icon = props.icon;

  return (
    <Link
      href={{
        pathname: "/settings/[option]",
        params: {
          option: props.option,
          title: props.name,
        },
      }}
      asChild
    >
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={[styles.nameContainer, Styles.horizontalContainer]}>
            <Icon />
            <Text style={styles.name}>{props.name}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Entypo
              name="chevron-thin-right"
              size={20}
              color={ColorPallete.border.dark}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

interface SettingOptionProps {
  name: string;
}

interface SettingBoolOptionProps extends SettingOptionProps {
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

export const SettingBoolOption = (props: SettingBoolOptionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{props.name}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Switch
          disabled={props.disabled ?? false}
          value={props.value}
          onValueChange={(val) => props.onChange?.(val)}
        />
      </View>
    </View>
  );
};

interface SettingPickOptionProps extends SettingOptionProps {
  enabled?: boolean;
  dataOptions: { label: string; value: number }[];
}

export const SettingPickOption = (props: SettingPickOptionProps) => {
  const pickerOptions = props.dataOptions.map((item, index) => {
    return <Picker.Item label={item.label} value={item.value} key={index} />;
  });

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{props.name}</Text>
      </View>
      <Picker
        style={styles.pickerContainer}
        mode="dropdown"
        enabled={props.enabled}
      >
        {pickerOptions}
      </Picker>
    </View>
  );
};

interface SettingMarkdownOptionProps {
  asset: number;
}

export const SettingMarkdownOption = (props: SettingMarkdownOptionProps) => {
  return (
    <ScrollView contentContainerStyle={styles.mdContainer}>
      <MarkdownView source="Cargando..." asset={props.asset} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mdContainer: {
    ...Styles.cardBorder,
    margin: 5,
    padding: 10,
  },
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    ...Styles.horizontalContainer,
  },
  debug: {
    backgroundColor: "red",
  },
  nameContainer: {
    flex: 6,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },
  pickerContainer: {
    flex: 2.5,
  },
  name: {
    marginLeft: 5,
    ...Styles.textBody,
  },
});
