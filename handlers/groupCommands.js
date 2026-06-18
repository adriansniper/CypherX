/**
 * CypherX Group Commands Handler
 * Group management features
 */

/**
 * Handle group commands
 */
async function handleGroupCommand(msg, prefix) {
  const messageBody = msg.body;
  const command = messageBody.slice(prefix.length).trim();
  const commandName = command.split(' ')[0].toLowerCase();

  try {
    // Check if message is from a group
    const chat = await msg.getChat();
    if (!chat.isGroup) {
      await msg.reply('❌ This command only works in groups');
      return true;
    }

    if (commandName === 'members' || commandName === 'totalmembers') {
      const participants = chat.participants.length;
      const admins = chat.participants.filter(p => p.isAdmin).length;
      
      const info = `👥 *Group Information:*
Name: ${chat.name}
Members: ${participants}
Admins: ${admins}
Description: ${chat.description || 'No description'}`;
      
      await msg.reply(info);
      return true;
    }

    if (commandName === 'groupid') {
      await msg.reply(`🆔 *Group ID:*\n${chat.id._serialized}`);
      return true;
    }

    if (commandName === 'link') {
      try {
        const inviteCode = await chat.getInviteLink();
        await msg.reply(`🔗 *Group Invite Link:*\n${inviteCode}`);
      } catch (error) {
        await msg.reply('❌ Cannot generate invite link. You may not have permission.');
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error in group command:', error);
    await msg.reply(`❌ Error: ${error.message}`);
    return true;
  }
}

module.exports = {
  handleGroupCommand
};