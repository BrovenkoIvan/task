import React from 'react'
import { View, StyleSheet, TextInput, } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
    return(
        <View style={styles.searchContainer}>
            <Icon name='search' size={30} color={'grey'} style={styles.inputIcon}/>
            <TextInput 
                style={styles.inputStyle}
                placeholder="Search"
                value={term}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 15,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 13, 
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    inputIcon: {
        padding: 10
    },
    inputStyle: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        fontSize:18
    }
})

export default SearchBar