import Command, { RunCallback } from "../structures/Command";
import joinPlayer from "../util/actions/joinPlayer";
import getPermission, { PermissionLevel } from "../util/permission";

const run: RunCallback = async (client, message, args, settings) => {
  if (!message.member) return;

  if (getPermission(message.member, settings) < PermissionLevel.MOD) {
    message.channel.send("You don't have permission to do that!");
    return;
  }

  if (!message.mentions.members) {
    message.channel.send("You need to tag someone as an argument!");
    return;
  }

  const member = message.mentions.members.first();
  if (!member) {
    message.channel.send("That member was not found!");
    return;
  }

  joinPlayer(member, settings);
};

const ForceJoinCommand: Command = {
  name: "forcejoin",
  aliases: ["fj"],
  run,
};

module.exports = ForceJoinCommand;
