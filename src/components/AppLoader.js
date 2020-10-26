import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

export const AppLoader = () => (
  <View style={styles.center}>
    <ActivityIndicator size='large' color="#8000FF" />
  </View>
)

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
