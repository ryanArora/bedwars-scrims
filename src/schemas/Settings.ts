import { Schema, model, Document } from "mongoose";
import { Snowflake } from "discord.js";

export enum Teams {
  ONE,
  TWO,
}

export enum PickingMode {
  FIRST,
  RANDOM,
  TRUERANDOM,
}

export interface ISettings extends Document {
  id: Snowflake;
  scrimsChat: Snowflake;
  teamPickingVoice: Snowflake;
  team1Voice: Snowflake;
  team2Voice: Snowflake;
  modRole: Snowflake;
  bannedRole: Snowflake;
  players: Snowflake[];
  team1: Snowflake[];
  team2: Snowflake[];
  pick: Teams;
  pickingMode: PickingMode;
}

const SettingsSchema = new Schema({
  id: { type: String, requried: true, index: true, unique: true },
  scrimsChat: { type: String, required: true },
  team1Voice: { type: String, required: true },
  team2Voice: { type: String, required: true },
  modRole: { type: String, required: true },
  bannedRole: { type: String, required: true },
  players: { type: Array, required: true, default: [] },
  team1: { type: Array, required: true, default: [] },
  team2: { type: Array, required: true, default: [] },
  pick: { type: Number, required: true, default: Teams.ONE, enum: Object.values(Teams) },
  pickingMode: { type: Number, required: true, default: PickingMode.RANDOM, enum: Object.values(PickingMode) },
});

export default model<ISettings>("settings", SettingsSchema);
