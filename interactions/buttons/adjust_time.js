const MessageHandler = require('../MessageHandler.js');
const dayjs = require('dayjs');

const timeChange = async (i, _state_info) => {
  let state_info = _state_info;
  let btn = i.customId;
  if (btn === 'later') {
    state_info.time = state_info.time.add(30, 'minute');
    state_info.delay_id = i.user.id;
    await i.deferUpdate();
  } else if (btn === 'earlier' && i.user.id === state_info.delay_id) {
    state_info.time = state_info.time.subtract(30, 'minute');
    await i.deferUpdate();
  } else if (btn === 'earlier' && i.user.id !== state_info.delay_id)
    await i.reply({
      content: `Oops, only the user who delayed the time can use this!`,
      ephemeral: true,
    });
  await MessageHandler.messageUpdate(i, state_info);
  return state_info;
};

const admin_timeChange = async (_info) => {
  let info = _info;
  info.time = dayjs().hour(15).minute(0).second(0).millisecond(0);
  return info;
};

module.exports = {
  timeChange,
  admin_timeChange,
};
