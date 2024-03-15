import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader';

// url : https://www.npmjs.com/package/react-qr-reader#example-usage
const ReadQrPage = () => {
    const [data, setData] = useState('No result');

  return (
    <div className='contain'>
      <div className='font-bold'>{data}</div>
      <div className='rounded-lg overflow-hidden border-gray-200 border-[1px] py-0'>
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
          scanDelay={1000}
        />
      </div>
    </div>
  )
}

export default ReadQrPage