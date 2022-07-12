const { MessageButton, MessageActionRow } = require('discord.js');

const delayBtn = new MessageButton()
  .setCustomId('later')
  .setLabel('Later')
  .setStyle('PRIMARY')
  .setDisabled(false);
const earlierBtn = new MessageButton()
  .setCustomId('earlier')
  .setLabel('Earlier')
  .setStyle('PRIMARY')
  .setDisabled(true);
const cancelBtn = new MessageButton()
  .setCustomId('cancel')
  .setLabel('Cancel')
  .setStyle('DANGER');
const reenableBtn = new MessageButton()
  .setCustomId('reenable')
  .setLabel('Re-enable')
  .setStyle('PRIMARY');
const row_enabled = new MessageActionRow().addComponents(
  earlierBtn,
  delayBtn,
  cancelBtn
);
const row_cancelled = new MessageActionRow().addComponents(reenableBtn);

module.exports = {
  delayBtn,
  earlierBtn,
  cancelBtn,
  reenableBtn,
  row_enabled,
  row_cancelled,
};
