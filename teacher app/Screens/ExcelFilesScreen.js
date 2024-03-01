import React, { useEffect, useState } from 'react';
import { View, Button, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncherAndroid from 'expo-intent-launcher';
import {excel_folder} from '../Settings.json';

const ExcelFilesScreen = () => {
  const [files, setFiles] = useState([]);

    useEffect(() => {
        readFilesInDirectory();
    }, []);

    const readFilesInDirectory = async () => {
        try {
            const directoryUri = FileSystem.documentDirectory + excel_folder; // or another directory path
            const directoryInfo = await FileSystem.getInfoAsync(directoryUri);
            
            if (!directoryInfo.exists || !directoryInfo.isDirectory) {
              throw new Error('Directory does not exist or is not a directory');
            }
          
            const filesInDirectory = await FileSystem.readDirectoryAsync(directoryUri);
            setFiles(filesInDirectory);
        } catch (error) {}
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
            console.error('Error opening file:', error);
            Alert.alert('Error', 'Failed to open file.');
        }
    };

  const renderItem = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => openFile(item)} className="">
            <Text>{item}</Text>
        </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        ListEmptyComponent={<Text>No files found</Text>}
      />
    </View>
  );
};

export default ExcelFilesScreen;
