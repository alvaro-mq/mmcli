module.exports = {
  LIST_MODEMS: 'mmcli -L',
  ENABLE_MODEM: 'mmcli -m {modemId} -e',
  CREATE_SMS: 'mmcli -m {modemId} --messaging-create-sms="text=\'{text}\', number=\'{number}\'"',
  SEND_SMS: 'mmcli -s {smsId} --send',
};
