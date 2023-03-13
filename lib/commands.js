module.exports = {
  LIST_MODEMS: 'mmcli -L',
  ENABLE_MODEM: 'mmcli -m {modemId} -e',
  CREATE_SMS: 'mmcli -m {modemId} --messaging-create-sms="text=\'{text}\', number=\'{number}\'"',
  SEND_SMS: 'mmcli -s {smsId} --send',
  MODEM_STATUS: 'mmcli -m {modemId} --output-json',
  MODEM_STATUS_LEGACY: 'mmcli -m {modemId} -K',
};
