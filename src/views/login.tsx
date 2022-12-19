import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {User} from '../types/user';

const users: User[] = [
  {email: 'sasha@gmail.com', password: 'Qwe123321'},
  {email: 'dima@gmail.com', password: 'Atoma123'},
];
interface LoginProps {
  navigation: any;
}
export const LoginScreen = (props: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [logInError, setLoginError] = useState('');
  const [showButton, setLoading] = useState(false);

  useEffect(() => {
    if (email.length >= 6 && password.length >= 6) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [email, password]);

  useEffect(() => {}, [errEmail, errPassword]);

  const validateForm = () => {
    let isEmailValid = emailChecker();
    let isPassValid = passwordChecker();

    if (!isEmailValid) {
      setErrEmail('Email is not correct');
    }

    if (!isPassValid) {
      setErrPassword('Pass is not correct');
    }

    if (isEmailValid && isPassValid) {
      setErrPassword('');
      setErrEmail('');

      return true;
    }
  };

  const submitForm = () => {
    let isValid = validateForm();

    if (isValid) {
      login();
    }
  };

  const passwordChecker = () => {
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    return reg.test(password);
  };

  const emailChecker = () => {
    let reg = /^\S+@\S+\.\S+$/;

    return reg.test(email);
  };

  const changeHandlerEmail = (val: React.SetStateAction<string>) => {
    setEmail(val);
  };

  const changeHandlerPassword = (val: React.SetStateAction<string>) => {
    setPassword(val);
  };
  const login = () => {
    let isSuccess = signInUser();

    if (isSuccess) {
      setLoginError('');
      props.navigation.navigate('Home');
      return;
    }

    setLoginError('This is incorrect user');
  };

  function signInUser(): boolean {
    for (let user of users) {
      if (user.email === email && user.password === password) {
        return true;
      }
    }

    return false;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter your email"
          placeholderTextColor="#003f5c"
          onChangeText={changeHandlerEmail}
          value={email}
        />
      </View>
      <Text style={styles.errorEmail}>{errEmail}</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter your password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={changeHandlerPassword}
          value={password}
        />
      </View>
      <Text style={styles.errorEmail}>{errPassword}</Text>

      {showButton && (
        <TouchableOpacity style={styles.loginBtn} onPress={() => submitForm()}>
          <Text>Log in</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.errorEmail}>{logInError}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#DE3163',
  },
  errorEmail: {
    marginBottom: 20,
    color: 'red',
  },
});
