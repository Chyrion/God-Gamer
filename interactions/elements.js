const { ButtonBuilder, ActionRowBuilder, roleMention } = require('discord.js');

const delayBtn = new ButtonBuilder()
  .setCustomId('later')
  .setLabel('Later')
  .setStyle('Primary')
  .setDisabled(false);
const earlierBtn = new ButtonBuilder()
  .setCustomId('earlier')
  .setLabel('Earlier')
  .setStyle('Primary')
  .setDisabled(true);
const cancelBtn = new ButtonBuilder()
  .setCustomId('cancel')
  .setLabel('Cancel')
  .setStyle('Danger');
const reenableBtn = new ButtonBuilder()
  .setCustomId('reenable')
  .setLabel('Re-enable')
  .setStyle('Primary');
const interestedBtn = new ButtonBuilder()
  .setCustomId('interested')
  .setLabel(`I'm in`)
  .setStyle('Success');
const notInterestedBtn = new ButtonBuilder()
  .setCustomId('not_interested')
  .setLabel(`I'm out`)
  .setStyle('Danger');
const row_enabled = new ActionRowBuilder().addComponents(
  earlierBtn,
  delayBtn,
  interestedBtn,
  notInterestedBtn,
  cancelBtn
);
const row_cancelled = new ActionRowBuilder().addComponents(reenableBtn);

let embed_enabled = {
  color: 0x0fbf15,
  title: 'GAMING!!!!!!!!!!!!!!',
  fields: [
    {
      name: 'Time',
      value: 'undefined',
      inline: true,
    },
    {
      name: `Who's in??`,
      value: 'undefined',
      inline: true,
    },
  ],
};

let embed_cancelled = {
  color: 0xb00b0b,
  title: 'Gaming cancelled :(',
  description: 'To re-enable, the canceller may press the re-enable button',
};

const enabled = {
  content: roleMention('956924628335489086'),
  embeds: [embed_enabled],
  components: [row_enabled],
};

const cancelled = {
  content: null,
  embeds: [embed_cancelled],
  components: [row_cancelled],
};

module.exports = {
  delayBtn,
  earlierBtn,
  cancelBtn,
  reenableBtn,
  interestedBtn,
  notInterestedBtn,
  row_enabled,
  row_cancelled,
  enabled,
  cancelled,
};
