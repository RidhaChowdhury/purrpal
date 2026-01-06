import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const signInStore = useAuthStore((s) => s.signIn)
  const signOutStore = useAuthStore((s) => s.signOut)

  async function signInWithEmail() {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      Alert.alert(error.message)
      return
    }
    // If sign in succeeded, update local store
    if (data?.session) {
      signInStore()
    }
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      Alert.alert(error.message)
      return
    }
    if (!data?.session) {
      Alert.alert('Please check your inbox for email verification!')
    } else {
      signInStore()
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    signOutStore()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in / Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="email@address.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonRow}>
        <Button title="Sign in" onPress={signInWithEmail} disabled={loading} />
        <View style={{ width: 12 }} />
        <Button title="Sign up" onPress={signUpWithEmail} disabled={loading} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="Sign out" onPress={signOut} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 420,
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
})


