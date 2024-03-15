import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader';

// url : https://www.npmjs.com/package/react-qr-reader#example-usage
const ReadQrPage = () => {
    const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
            setData('error')
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  )
}

export default ReadQrPage