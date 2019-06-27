import React, { Component } from 'react';
import { View, Dimensions, Image, Text } from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get('window');

export default class App extends Component {
  render() {
    return (
        <View>
            <Carousel
              delay={3000}
              style={{height, width}}
              autoplay
              pageInfo
              onAnimateNextPage={(p) => console.log(p)}>
                <Image source={require('./assets/picture3.jpg')} style={{height, width}} />
            </Carousel>
            
            <View style={{right: '20%',left: '18%',position:'absolute', bottom:'40%', flexDirection: 'column', paddingBottom: 10, paddingTop: 10, paddingLeft: 10}}>
                <LoginButton
                    readPermissions={['public_profile', 'email']}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {

                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        let accessToken = data.accessToken;

                                        const responseInfoCallback = (error, result) => {
                                            if (error) {
                                                console.log(error)
                                                alert('Error fetching data: ' + error.toString());
                                            } else {
                                                console.log(result);
                                                alert('Welcome ' + result["name"]);
                                            }
                                        };

                                        const infoRequest = new GraphRequest(
                                            '/me',
                                            {
                                                accessToken: accessToken,
                                                parameters: {
                                                    fields: {
                                                        string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
                                                    }}},
                                            responseInfoCallback);
                                        new GraphRequestManager().addRequest(infoRequest).start()
                                    })}}}
                    onLogoutFinished={() => alert("logout.")}/>
            </View>
        </View>
    );
  }
};
