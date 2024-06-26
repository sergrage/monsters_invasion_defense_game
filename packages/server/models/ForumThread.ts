import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/sequlizeInit";

interface ForumThreadModel
  extends Model<
    InferAttributes<ForumThreadModel>,
    InferCreationAttributes<ForumThreadModel>
  > {
  id: CreationOptional<number>;
  title: string;
  views: number;
  login: string;
}

const ForumThread = sequelize.define<ForumThreadModel>("forum_thread", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
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
});

export default ForumThread;
