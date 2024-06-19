import { mongoose } from "mongoose";

export const connectMongo = () => {
  const mongoDB = process.env.ATLAS_URI || "";
  mongoose.connect(mongoDB);
  // Позволим Mongoose использовать глобальную библиотеку промисов
  mongoose.Promise = global.Promise;
  // Получение подключения по умолчанию
  var db = mongoose.connection;

  // Привязать подключение к событию ошибки  (получать сообщения об ошибках подключения)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  return db;
};
