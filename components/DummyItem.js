import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DummyItem = (props) => {
    return (
        <View>
            <Text style={styles.bodyText}> {props.innerText} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    bodyText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'green'
    }
})

export default DummyItem
