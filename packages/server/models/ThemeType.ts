import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/sequlizeInit";

interface ThemeTypeModel
  extends Model<
    InferAttributes<ThemeTypeModel>,
    InferCreationAttributes<ThemeTypeModel>
  > {
  id: CreationOptional<number>;
  theme_type?: string;
  user_id: number;
}

const ThemeType = sequelize.define<ThemeTypeModel>(
  "theme_type",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    theme_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ligth",
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["user_id"],
      },
    ],
  },
);

export default ThemeType;
