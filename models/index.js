const { sequelize, syncDb }  = require('../db')
const { DataTypes } = require('sequelize')


// models
const DefineUser = require('./User')
const DefineMixes = require('./Mixes')
const DefineProfile = require('./Profile')
const DefineTracks = require('./Tracks')

const User = DefineUser(sequelize, DataTypes)
const Mixes = DefineMixes(sequelize, DataTypes)
const Profile = DefineProfile(sequelize, DataTypes)
const Tracks = DefineTracks(sequelize, DataTypes)

// associations
Profile.hasOne(User, {
    onDelete: "CASCADE"
});
User.belongsTo(Profile);

User.hasMany(Mixes);
Mixes.belongsTo(User);

Mixes.hasMany(Tracks, {
    onDelete: "CASCADE"
});
Tracks.belongsTo(Mixes);

// sync
syncDb(sequelize, { alter:true })

module.exports = { 
    User, 
    Mixes, 
    Profile,
    Tracks
}