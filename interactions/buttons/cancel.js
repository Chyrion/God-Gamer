const MessageHandler = require('../MessageHandler');

const cancel = async (i, _state_info) => {
  let state_info = _state_info;
  let btn = i.customId;
  if (btn === 'cancel') {
    state_info.cancelled = true;
    state_info.cancel_id = i.user.id;
  } else if (btn === 'reenable' && i.user.id === state_info.cancel_id) {
    state_info.cancelled = false;
    state_info.cancel_id = undefined;
    state_info.interested_users.length === 0
      ? (state_info.interested_users = [i.user.id])
      : (state_info.interested_users = state_info.interested_users);
  }
  await MessageHandler.messageUpdate(i, state_info).then(await i.deferUpdate());
  return state_info;
};

module.exports = {
  cancel,
};
