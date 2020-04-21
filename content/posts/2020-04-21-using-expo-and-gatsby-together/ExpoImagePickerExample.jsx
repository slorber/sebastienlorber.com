import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import AppButton from 'components/designSystem/AppButton';
import * as ImageManipulator from 'expo-image-manipulator';

// copy of https://docs.expo.io/versions/v37.0.0/sdk/imagepicker/
export default class ExpoImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  rotate90andFlip = async () => {
    const image = this.state.image;
    const result = await ImageManipulator.manipulateAsync(
      image,
      [{ rotate: 90 }, { flip: ImageManipulator.FlipType.Vertical }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG },
    );
    console.debug({ result });
    this.setState({ image: result.uri });
  };

  transform = async actions => {
    const image = this.state.image;
    const result = await ImageManipulator.manipulateAsync(image, actions, {
      compress: 1,
      format: ImageManipulator.SaveFormat.PNG,
    });
    console.debug({ result });
    this.setState({ image: result.uri });
  };

  render() {
    let { image } = this.state;

    return (
      <>
        <AppButton onPress={this._pickImage} style={{ margin: 10 }}>
          Pick an image
        </AppButton>

        {image && (
          <>
            <Image
              source={{ uri: image }}
              style={{
                margin: 10,
                width: 200,
                height: 200,
                resizeMode: 'contain',
              }}
            />
            <AppButton
              onPress={() => this.transform([{ rotate: 90 }])}
              style={{ margin: 5 }}
            >
              Rotate
            </AppButton>
            <AppButton
              onPress={() =>
                this.transform([{ flip: ImageManipulator.FlipType.Vertical }])
              }
              style={{ margin: 5 }}
            >
              Flip
            </AppButton>
          </>
        )}
      </>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}
