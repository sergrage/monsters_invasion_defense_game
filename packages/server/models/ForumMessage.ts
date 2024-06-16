import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import sequelize from "../db/sequlizeInit";

interface ForumMessageModel
  extends Model<
    InferAttributes<ForumMessageModel>,
    InferCreationAttributes<ForumMessageModel>
  > {
  id: CreationOptional<number>;
  text: string;
  thread_id: number;
  created_by: number;
}

const ForumMessage = sequelize.define<ForumMessageModel>("forum_message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  thread_id: {
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
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      notNull: true,
      min: 1,
    },
  },
});

export default ForumMessage;
