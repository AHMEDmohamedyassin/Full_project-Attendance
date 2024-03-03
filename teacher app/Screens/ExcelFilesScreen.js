import React, { useEffect, useState } from 'react';
import { View, Button, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncherAndroid from 'expo-intent-launcher';
import {excel_folder} from '../Settings.json';
import * as MediaLibrary from 'expo-media-library';
import AppContainerComp from '../Components/Public/AppContainerComp'

const ExcelFilesScreen = () => {
  const [files, setFiles] = useState([]);

    useEffect(() => {
        readFilesInDirectory();
    }, []);

    const readFilesInDirectory = async () => {
        await askMediaLibraryPermission()
        try {
          const album = await MediaLibrary.getAlbumAsync('Pictures'  + excel_folder);

          const assets = await MediaLibrary.getAssetsAsync({ album: album });

          setFiles(assets.assets)
          
          console.log(album , assets)

        } catch (error) {
          console.log(error)
        }
    };

    const openFile = async (file_name) => {
        try {
            // Example file path
            const filePath = FileSystem.documentDirectory + excel_folder + file_name;
            
            // Example MIME type for a text file
            const mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            
            // Launch an intent to open the file with the appropriate application
            await IntentLauncherAndroid.startActivityAsync('android.intent.action.VIEW', {
                data: filePath,
                type: mimeType,
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to open file.');
        }
    };
  
  // ask permissions for mediaLibaray
  async function askMediaLibraryPermission() {
    try {
      // Request permissions to access the media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
  
      if (status === 'granted') {
        console.log('Media library permission granted');
        return true
        // You can now access the media library
      } else {
        console.log('Permission denied');
        return false
        // Handle permission denied case
      }
    } catch (error) {
      console.error('Error asking for media library permission:', error);
      return false
    }
  }

  return (
    <AppContainerComp>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          files.map((item , index) => (
            <TouchableOpacity key={index} onPress={() => openFile(item)} className="">
                <Text>{item.filename}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </AppContainerComp>
  );
};

export default ExcelFilesScreen;
