const { time } = require('@discordjs/builders');
const Elements = require('./elements.js');

const messageUpdate = async (i, _state_info) => {
  if (!_state_info.cancelled) {
    let msg = _state_info.msg;
    msg.embeds[0].fields[0].value = time(_state_info.time.toDate());
    msg.embeds[0].title = `GAMING ${time(_state_info.time.toDate(), 'R')}`;
    if (_state_info.interested_users.length === 1) {
      msg.embeds[0].fields[1].value = '1 gamer is in';
    } else {
      msg.embeds[0].fields[1].value =
        _state_info.interested_users.length + ' gamers are interested!!!';
    }
    if (i.message === undefined) {
      await i.channel.send(_state_info.msg).catch((err) => console.log(err));
    } else {
      await buttonUpdate(i, _state_info)
        .then(await i.message.edit(msg))
        .catch((err) => console.log(err));
    }
  } else {
    await i.message.edit(Elements.cancelled);
  }
};

const buttonUpdate = async (i, state_info) => {
  let buttons = state_info.msg.components[0].components;
  for (i = 0; i < buttons.length; i++) {
    if (
      buttons[i].data.custom_id === 'later' &&
      state_info.time.hour() == 19 &&
      state_info.time.minute() == 0
    ) {
      buttons[i].data.disabled = true;
    } else if (
      buttons[i].data.custom_id === 'earlier' &&
      state_info.time.hour() == 15 &&
      state_info.time.minute() == 0
    ) {
      buttons[i].data.disabled = true;
    } else buttons[i].data.disabled = false;
  }
};

module.exports = {
  messageUpdate,
};
