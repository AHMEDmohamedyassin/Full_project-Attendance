import React from 'react'
import { Text, TouchableOpacity, View , Alert } from 'react-native'
import { ArrowDownTrayIcon } from 'react-native-heroicons/solid'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as XLSX from 'xlsx';
import {excel_folder} from '../../Settings.json';

const DownloadBtnComp = () => {

  const createExcel = async () => {
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
  const directory = FileSystem.documentDirectory + excel_folder;

  // Create the directory if it doesn't exist
  await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

  // File path for the Excel file
  const filePath = directory + '/data.xlsx';

  try {
    // Write the Excel file to the device's filesystem
    await FileSystem.writeAsStringAsync(filePath, excelFile, { encoding: FileSystem.EncodingType.Base64 });

    // Share the local file URL
    Sharing.shareAsync(filePath)
      .then(() => {
      })
      .catch((error) => {
        // Error sharing file
        Alert.alert('حدثت مشكلة ما في مشاركة الملف');
      });
  } catch (error) {
    Alert.alert('حدثت مشكلة ما في كتابة الملف');
  }
  };
  

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