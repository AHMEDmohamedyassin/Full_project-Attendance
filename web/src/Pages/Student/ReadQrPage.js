import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader';

// url : https://www.npmjs.com/package/react-qr-reader#example-usage
const ReadQrPage = () => {
    const [data, setData] = useState('No result');

  return (
    <div className='contain'>
      <p>{data}</p>

        <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info('error' , error);
          }
        }}
        scanDelay={10000}
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default ReadQrPage