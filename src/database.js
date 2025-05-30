import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import { format } from 'date-fns';
// import { utcToZonedTime } from 'date-fns-tz';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || "158.220.123.203",
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: console.log,
        native: false,
        timezone: 'UTC', // Configura Sequelize para usar UTC
        dialectOptions: {
            useUTC: true, // Usar UTC en las consultas
        },
        define: {
            timestamps: true, // Habilita timestamps automáticos
            createdAt: 'fechaCreacion',
            updatedAt: 'fechaModificacion'
        },
        // Configura cómo Sequelize maneja las fechas
        typeValidation: true,
        // eslint-disable-next-line no-dupe-keys
        dialectOptions: {
            dateStrings: true,
            typeCast: function (field, next) {
                if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
                    return format(field.string(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone: 'UTC' });
                }
                return next();
            },
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        retry: {
            match: [
                /SequelizeConnectionError/,
                /SequelizeConnectionRefusedError/,
                /ECONNRESET/,
                /ETIMEDOUT/
            ],
            max: 3
        }
    }
);

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la base de datos');
    }
};

// Hook global beforeCreate
sequelize.addHook('beforeCreate', (instance, options) => {
    const req = options.context;

    if (req && req.sequelizeUser && req.sequelizeUser.idUsuario) {
        instance.idUsuario = req.sequelizeUser.idUsuario;
        instance.fechaCreacion = new Date(); // Esto será en UTC debido a la configuración de Sequelize
    } else {
        throw new Error("ID Usuario no encontrado en el hook global");
    }
});

// Hook global beforeUpdate
sequelize.addHook('beforeUpdate', (instance, options) => {
    const req = options.context;

    if (req && req.sequelizeUser && req.sequelizeUser.idUsuario) {
        instance.fechaModificacion = new Date(); // Esto será en UTC debido a la configuración de Sequelize
    } else {
        throw new Error("ID Usuario no encontrado en el hook global");
    }
});

// Función para convertir fechas a formato ISO 8601 en UTC
const dateToUTC = (date) => {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone: 'UTC' });
};

// Configuración global para manejar fechas en todos los modelos
// eslint-disable-next-line no-unused-vars
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return dateToUTC(date);
};

export { sequelize, dbConnection, DataTypes };


// // import { Sequelize } = require('sequelize');
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config();


// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST || "158.220.123.203",
//     dialect: 'postgres',
//     port: process.env.DB_PORT || 5432,
//     // logging: false, // set to console.log to see the raw SQL queries
//     logging: console.log,
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

// const dbConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('DB Online');
//     } catch (error) {
//         console.log(error);
//         throw new Error('Error al conectar con la base de datos');
//     }
// };

// // Definir hooks globales de beforeCreate
// sequelize.addHook('beforeCreate', (instance, options) => {
//     const req = options.context;

//     if (req && req.sequelizeUser && req.sequelizeUser.idUsuario) {
//         instance.idUsuario = req.sequelizeUser.idUsuario;  // Agregar el idUsuario automáticamente
//     } else {
//         throw new Error("ID Usuario no encontrado en el hook global");
//     }
// });

// export { sequelize, dbConnection };

