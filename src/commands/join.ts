import Command, { RunCallback } from "../structures/Command";
import joinPlayer from "../util/actions/joinPlayer";
import getPermission, { PermissionLevel } from "../util/permission";

const run: RunCallback = async (client, message, args, settings) => {
  if (!message.member) return;

  if (getPermission(message.member, settings) < PermissionLevel.DEFAULT) {
    message.channel.send("You dont have permission to do that!");
    return;
  }

  joinPlayer(message.member, settings);
};

const JoinCommand: Command = {
  name: "join",
  aliases: ["j"],
  run,
};

module.exports = JoinCommand;
