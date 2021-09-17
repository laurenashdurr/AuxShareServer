module.exports = (sequelize, DataTypes) => {

    const Mixes = sequelize.define("Mixes", {
        mixName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        imageUrl: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING, 
            allowNull: true,
        }

    })
    return Mixes
}