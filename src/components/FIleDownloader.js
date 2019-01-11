
import { FileSystem } from 'react-native';



const imageDownloader = (props) => {
    FileSystem.downloadAsync(
        props.url,
        FileSystem.documentDirectory + props.ts +'.jpg'
      )
        .then(({ uri }) => {
          console.log('Finished downloading to ', uri);
        })
        .catch(error => {
          console.error(error);
        });
}

const videoDownloader = (props) => {
    const { uri: localUri } = await FileSystem.downloadAsync(remoteUri, FileSystem.documentDirectory + 'name.ext');
    }

const timelapseDownloader = (props) => {
    const { uri: localUri } = await FileSystem.downloadAsync(remoteUri, FileSystem.documentDirectory + 'name.ext');
    }

export default ( imageDownloader, videoDownloader, timelapseDownloader );