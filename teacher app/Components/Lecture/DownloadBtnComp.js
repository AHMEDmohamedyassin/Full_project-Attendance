import React from 'react'
import { Text, TouchableOpacity, View , Alert } from 'react-native'
import { ArrowDownTrayIcon } from 'react-native-heroicons/solid'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as XLSX from 'xlsx';
import {excel_folder} from '../../Settings.json';
import * as MediaLibrary from 'expo-media-library';

const DownloadBtnComp = () => {

  const createExcel = async () => {
    await askMediaLibraryPermission()
  // Sample data
  const data = [
    ['Name', 'Age', 'Country'],
    ['John', 30, 'USA'],
    ['Alice', 25, 'Canada'],
  ];

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Convert data to worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Convert workbook to binary string
  const excelFile = XLSX.write(workbook, { type: 'base64' });

  // Get the directory for storing files
  const directory = FileSystem.cacheDirectory + excel_folder;

  // Create the directory if it doesn't exist
  await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

  const file_name = '/data.xlsx'
  // File path for the Excel file
  const filePath = directory + file_name;

  try {    
    // Write the Excel file to the device's filesystem
    await FileSystem.writeAsStringAsync(filePath, excelFile, { encoding: FileSystem.EncodingType.Base64 });

    await saveFileToMediaLibrary(filePath)
    await SharingFile(filePath)

    } catch (error) {
      console.log(error)
    Alert.alert('حدثت مشكلة ما في كتابة الملف');
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
  
    
    // save file to meida library
    async function saveFileToMediaLibrary(filePath) {
      const albumName = excel_folder; // Specify the name of the album (directory)
      try {
        // Create asset from the file path
        const asset = await MediaLibrary.createAssetAsync(filePath);

        console.log(asset)
    
        // Check if the album exists
        const albums = await MediaLibrary.getAlbumsAsync();
        const album = albums.find(album => album.title === albumName);
    
        // If the album doesn't exist, create it
        if (!album) {
          const created_album = await MediaLibrary.createAlbumAsync(albumName, asset, true);
        } else {
          // If the album exists, add the asset to it
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
        }

    
        console.log('File added to the media library album:', albumName);
      } catch (error) {
        console.error('Error saving file to media library:', error);
      }
    }


    async function SharingFile (filePath) {
    // Share the local file URL
      Sharing.shareAsync(filePath)
        .then(() => {
        })
        .catch((error) => {
          // Error sharing file
          Alert.alert('حدثت مشكلة ما في مشاركة الملف');
          console.log(error)
        });
    }


    
  return (
      <View className="flex flex-row">
            <TouchableOpacity onPress={createExcel} className="flex flex-row items-center gap-x-2 bg-mainBlue rounded py-1 px-4 shadow-lg shadow-slate-50" >
                <ArrowDownTrayIcon size={20} fill={'white'} />
                <Text className="text-white">تنزيل ملف Excel</Text>
            </TouchableOpacity>
      </View>
  )
}

export default DownloadBtnComp