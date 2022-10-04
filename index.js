const { Client, GatewayIntentBits } = require('discord.js');
const {
  interested_press,
  not_interested_press,
} = require('./interactions/buttons/interested.js');
const { gaming_create } = require('./interactions/commands/gaming.js');
const {
  timeChange,
  admin_timeChange,
} = require('./interactions/buttons/adjust_time');
const { cancel } = require('./interactions/buttons/cancel.js');
const dayjs = require('dayjs');
var dayOfYear = require('dayjs/plugin/dayOfYear');
require('dotenv').config();
dayjs.extend(dayOfYear);

let state_info = {
  req_status: 'inactive',
  active: false,
  reset_bypass: false,
  interested_users: [],
  cancel_id: undefined,
  cancelled: false,
  delay_id: undefined,
  time: dayjs(),
  last_date: undefined,
  msg: undefined,
};

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (i) => {
  if (i.isChatInputCommand()) {
    const { commandName } = i;
    if (commandName === 'dev_gaming') {
      state_info = await gaming_create(i, state_info);
    } else if (commandName === 'dev_reset') {
      if (i.user.id !== process.env.ADMIN_ID)
        i.reply({
          content: 'Only the bot admin can use this command',
          ephemeral: true,
        });
      else if (i.user.id === process.env.ADMIN_ID) {
        state_info.reset_bypass = true;
        i.reply({ content: 'Reset bypass active', ephemeral: true });
      }
    } else if (commandName === 'dev_time') {
      if (i.user.id !== process.env.ADMIN_ID)
        i.reply({
          content: 'Only the bot admin can use this command',
          ephemeral: true,
        });
      else if (i.user.id === process.env.ADMIN_ID) {
        state_info = admin_timeChange(state_info);
        i.reply({ content: 'Time successfully reset', ephemeral: true });
      }
    }
  } else if (i.isButton()) {
    let btn = i.customId;
    console.log(btn);
    switch (btn) {
      case 'interested':
        state_info = await interested_press(i, state_info);
        break;
      case 'not_interested':
        state_info = await not_interested_press(i, state_info);
        break;
      case 'earlier':
      case 'later':
        state_info = await timeChange(i, state_info);
        break;
      case 'cancel':
      case 'reenable':
        state_info = await cancel(i, state_info);
    }
  }
});

client.login(process.env.TOKEN);
