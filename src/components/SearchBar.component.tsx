import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SPACING} from '../theme/theme';

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  resetSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  setSearchText,
  resetSearch,
}) => {
  return (
    <View style={styles.container}>
      <Feather
        name="search"
        size={22}
        color={
          searchText.length > 0
            ? COLORS.primaryOrangeHex
            : COLORS.primaryLightGreyHex
        }
      />
      <TextInput
        placeholder="Find Your Coffee..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
        placeholderTextColor={COLORS.primaryLightGreyHex}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={resetSearch}>
          <Ionicons name="close" size={22} color={COLORS.primaryLightGreyHex} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    backgroundColor: COLORS.primaryDarkGreyHex,
    padding: 10,
    borderRadius: SPACING.space_10,
    marginBottom: SPACING.space_15,
  },
  input: {
    color: COLORS.primaryWhiteHex,
    flex: 1,
  },
});
