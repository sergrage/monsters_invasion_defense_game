import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/sequlizeInit";

interface ForumMessageReplyModel
  extends Model<
    InferAttributes<ForumMessageReplyModel>,
    InferCreationAttributes<ForumMessageReplyModel>
  > {
  id: CreationOptional<number>;
  text: string;
  message_id: number;
  login: string;
}

const ForumMessageReply = sequelize.define<ForumMessageReplyModel>(
  "forum_message_reply",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notNull: true,
        min: 1,
      },
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
      },
    },
  },
);

export default ForumMessageReply;
