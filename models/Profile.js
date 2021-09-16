module.exports = (sequelize, DataTypes) => {

    const Profile = sequelize.define("Profile", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    })
    return Profile
}