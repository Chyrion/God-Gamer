const dayjs = require('dayjs');
var dayOfYear = require('dayjs/plugin/dayOfYear');
const Elements = require('../elements.js');
const MessageHandler = require('../MessageHandler.js');

dayjs().format();
dayjs.extend(dayOfYear);

const gaming_create = async (i, _state_info) => {
  let now = dayjs();
  let state_info = _state_info;
  if (!state_info.active && dayCheck(_state_info) | state_info.reset_bypass) {
    if (state_info.reset_bypass) state_info.reset_bypass = false;
    now = dayjs().hour(15).minute(0).second(0).millisecond(0);
    state_info.last_date =
      `${dayjs().get('D')}` + `${dayjs().get('M')}` + `${dayjs().get('y')}`;
    state_info.time = now;
    state_info.msg = Elements.enabled;
    state_info.interested_users = [i.user.id];
    await i
      .reply({
        content: 'Gaming created!',
        ephemeral: true,
      })
      .then(await MessageHandler.messageUpdate(i, state_info));
  } else {
    await i.reply({
      content: 'Gaming already active',
      ephemeral: true,
    });
  }
  return state_info;
};

// Compares the current date to the date of the last gaming session, and returns true if a new session is allowed, false otherwise
const dayCheck = (_info) => {
  let current_date =
    `${dayjs().get('D')}` + `${dayjs().get('M')}` + `${dayjs().get('y')}`;
  if ((_info.last_date === undefined) | (_info.last_date !== current_date))
    return true;
  else if (_info.last_date !== current_date) return true;
  else return false;
};

module.exports = {
  gaming_create,
};
