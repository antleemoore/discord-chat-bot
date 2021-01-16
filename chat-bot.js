const Discord = require('discord.js');
const client = new Discord.Client();
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// readying the bot
client.on('ready', () => {
   console.log('connected as ' + client.user.tag);
   //setting the presence of the bot
   client.user
      .setPresence({ activity: { name: 'Youtube', type: 'WATCHING' } })
      .then()
      .catch(console.error);

   client.guilds.cache.forEach(guild => {
      console.log(guild.name);
      guild.channels.cache.forEach(channel => {
         console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
      });
      // general chat id: 799796577702379584
   });
   // get channel id to work with that channel
   let generalChannel = client.channels.cache.get('799796577702379584');
   /*
   const attachment = new Discord.MessageAttachment(
      '/mnt/c/Users/Bruce/Pictures/Camera Roll/panda.png'
   );
   */
   // send messages to channel
   generalChannel.send('Hello, World!' /*, attachment*/);
});
// whenever a message is received in a channel
client.on('message', receivedMessage => {
   // avoid infinite loop
   if (receivedMessage.author === client.user) return;
   // replying with message and reactions
   //! receivedMessage.channel.send(
   //!    'Message received: ' +
   //!       receivedMessage.author.toString() +
   //!       ' ' +
   //!       receivedMessage.content
   //! );
   //! receivedMessage.react('👍'); // 👎
   //! let customEmoji = receivedMessage.guild.emojis.cache.get('799812787219464273');
   //! receivedMessage.react(customEmoji);
   //! receivedMessage.guild.emojis.cache.forEach(customEmoji => {
   //!    console.log(`${customEmoji.name} ${customEmoji.id}`); // wall maria id: 799812787219464273
   //!    receivedMessage.react(customEmoji);
   //! });

   //processing commands
   if (receivedMessage.content.startsWith('!')) {
      processCommand(receivedMessage);
   }
});

// function for processing commands
function processCommand(receivedMessage) {
   let fullCommand = receivedMessage.content.substr(1);
   let splitCommand = fullCommand.split(' ');
   let primaryCommand = splitCommand[0];
   let arguments = splitCommand.slice(1);

   if (primaryCommand === 'help') {
      helpCommand(arguments, receivedMessage);
   } else if (primaryCommand === 'multiply') {
      multiplyCommand(arguments, receivedMessage);
   } else {
      receivedMesssage.channel.send("i don't know that command");
   }
}

//creating the help commands
function helpCommand(arguments, receivedMessage) {
   if (arguments.length == 0) {
      receivedMessage.channel.send('not sure what you want');
   } else {
      receivedMessage.channel.send('helping you with ' + arguments);
   }
}

// creating the multiply command
function multiplyCommand(arguments, receivedMessage) {
   if (arguments.length < 2) {
      receivedMessage.channel.send('bad input');
      return;
   }
   let product = 1;
   arguments.forEach(value => {
      product = product * parseFloat(value);
   });
   receivedMessage.channel.send(product.toString());
}
client.login(process.env.CHAT_BOT_TOKEN);
