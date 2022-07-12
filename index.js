const { time, roleMention } = require('@discordjs/builders');
const { Client, Intents } = require('discord.js');
require('dotenv').config();
const Elements = require('./elements.js');

var cancelId, delayId;
let relDate = ' ';
let active = false;
let date = new Date();
date.setDate(date.getDate() - 1);
let gamingDate = time(date);

const changeTime = (delay) => {
  //delay = bool, if true -> delay, if false -> earlier
  delay
    ? date.setMinutes(date.getMinutes() + 30)
    : date.setMinutes(date.getMinutes() - 30);
  date.setHours(date.getHours(), date.getMinutes());
  gamingDate = time(date);
  relDate = time(date, 'R');
  gamingEmbed_enabled.title = `GAMING ${relDate}`;
  gamingEmbed_enabled.fields[0].value = gamingDate;
  btnCheck();
};

//Disables the earlier and later buttons if the time is 18 or 22 respectively
const btnCheck = () => {
  if (date.getHours() == 18 && date.getMinutes() == 0) {
    Elements.earlierBtn.setDisabled(true);
  } else if (date.getHours() == 22 && date.getMinutes() == 0) {
    Elements.delayBtn.setDisabled(true);
  } else {
    Elements.earlierBtn.setDisabled(false);
    Elements.delayBtn.setDisabled(false);
  }
};

const gamingEmbed_enabled = {
  color: '#0fbf15',
  title: `GAMING ${relDate}`,
  fields: [
    {
      name: 'Time',
      value: gamingDate,
    },
  ],
};

const gamingEmbed_cancelled = {
  color: 'DARK_RED',
  title: 'Gaming cancelled :(',
  description: 'To re-enable, the canceller may press the re-enable button',
};

const enabled = {
  content: roleMention('956924628335489086'),
  embeds: [gamingEmbed_enabled],
  components: [Elements.row_enabled],
};

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  console.log(interaction.user);
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    //Checks if interaction is a command + if it's 'gaming'
    if (commandName === 'gaming') {
      //Checks the date if a request has been made today or not by comparing the current date to the earlier-set date
      //If the two aren't the same, it sets the active to false, which allows for a new request to be made
      let currDate = new Date();
      if (currDate.getDate() != date.getDate()) {
        active = false;
      } else {
        active = true;
      }
      if (!active) {
        //Sets the 'active' bool to true, which locks the request for today. Then sets the time for the same day's evening and updates necessary fields
        active = true;
        date.setDate(currDate.getDate());
        date = currDate;
        date.setHours(18, 00);
        gamingDate = time(date);
        relDate = time(date, 'R');
        gamingEmbed_enabled.title = `GAMING ${relDate}`;
        gamingEmbed_enabled.fields[0].value = gamingDate;
        await interaction.reply({
          content: 'Request successfully created!',
          ephemeral: true,
        });
        await interaction.channel.send(enabled);
      } else {
        //Notifies if a request cannot be made today
        await interaction.reply({
          content: 'A request has already been created!',
          ephemeral: true,
        });
      }
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === 'later') {
      //If the user delays, changes the time appropriately and saves the user's id for future use
      changeTime(true);
      delayId = interaction.user.id;
      await interaction.message.edit(enabled);
      await interaction.deferUpdate();
    } else if (interaction.customId === 'earlier') {
      //If the user moves the time up, checks to see if the person has been the one delaying with the delayId check
      //If the id of the delaying user matches the person who pressed this button, allows to change it, otherwise will not allow it
      if (interaction.user.id == delayId) {
        changeTime(false);
        await interaction.message.edit(enabled);
      }
      await interaction.deferUpdate();
    } else if (interaction.customId === 'cancel') {
      //If a user cancels, saves the user's id for later use and changes the embed into a different one to inform of cancellation
      cancelId = interaction.user.id;
      await interaction.message.edit({
        content: null,
        embeds: [gamingEmbed_cancelled],
        components: [Elements.row_cancelled],
      });
      await interaction.deferUpdate();
    } else if (interaction.customId === 'reenable') {
      //If a user wants to re-enable the request, checks to see if user's id matches the id of the one who cancelled
      //If match is found, allows for a re-enable, otherwise will not allow
      if (interaction.user.id == cancelId) {
        await interaction.message.edit(enabled);
      }
      await interaction.deferUpdate();
    }
  }
});

client.login(process.env.TOKEN);
