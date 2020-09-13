import { Model, DataTypes, Sequelize } from 'sequelize'

export class WeatherData extends Model {}

export const weatherDataModelDefiner = (sequelize: Sequelize) => {
    WeatherData.init(
        {
            timestamp: {
                type: DataTypes.DATE,
                allowNull: false,
                primaryKey: true
            },
            temperature: {
                type: DataTypes.FLOAT
            },
            humidity: {
                type: DataTypes.FLOAT
            },
            co2: {
                type: DataTypes.INTEGER
            }
        },
        { sequelize, timestamps: false }
    )
}
