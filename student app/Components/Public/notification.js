import React from 'react'
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification'

/**.
 * 
 * * * types : 
 * SUCCESS
 * DANGER
 * WARNING
 * INFO
 */
export const notify = (text = "" , type = "WARNING") => {
  Toast.show({
    type: ALERT_TYPE[type],
    textBody: text,
  })
}
