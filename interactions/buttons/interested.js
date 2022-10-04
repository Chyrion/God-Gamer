const { parseResponse } = require('discord.js');
const Elements = require('../elements.js');
const MessageHandler = require('../MessageHandler.js');
const interested_press = async (i, _state_info) => {
  let state_info = _state_info;
  switch (i.customId) {
    case 'interested':
      break;
    case 'not_interested':
      if (state_info.interested_users) break;
    default:
      break;
  }
  if (i.customId === 'interested') {
    if (!state_info.interested_users.includes(i.user.id)) {
      state_info.interested_users.push(i.user.id);
    }
  }
  await MessageHandler.messageUpdate(i, state_info);
  await i.deferUpdate();
  return state_info;
};

const not_interested_press = async (i, _state_info) => {
  let state_info = _state_info;
  if (state_info.interested_users.includes(i.user.id)) {
    state_info.interested_users.splice(
      state_info.interested_users.indexOf(i.user.id),
      1
    );
  }
  state_info.cancelled = state_info.interested_users.length === 0;
  state_info.cancelled
    ? (state_info.cancel_id = i.user.id)
    : (state_info.cancel_id = undefined);
  console.log(state_info.cancelled);
  await MessageHandler.messageUpdate(i, state_info);
  await i.deferUpdate();
  return state_info;
};

module.exports = {
  interested_press,
  not_interested_press,
};
