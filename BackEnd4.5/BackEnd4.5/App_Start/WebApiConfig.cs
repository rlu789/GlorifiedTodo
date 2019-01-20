using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using System.Web.Http;

namespace BackEnd4._5
{
    public static class WebApiConfig
    {
        private static bool ColumnExistsInTable(string tableName, string columnName)
        {
            using (var conn = new SQLiteConnection("Data Source=" + AppDomain.CurrentDomain.BaseDirectory + "MyDatabase.sqlite;Version=3;"))
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                cmd.CommandText = string.Format("PRAGMA table_info({0})", tableName);

                var reader = cmd.ExecuteReader();
                int nameIndex = reader.GetOrdinal("Name");
                while (reader.Read())
                {
                    if (reader.GetString(nameIndex).Equals(columnName))
                    {
                        conn.Close();
                        return true;
                    }
                }
                conn.Close();
            }
            return false;
        }

        public static void Register(HttpConfiguration config)
        {
            if (!File.Exists(AppDomain.CurrentDomain.BaseDirectory + "MyDatabase.sqlite"))
            {
                // create a new database connection:
                SQLiteConnection.CreateFile(AppDomain.CurrentDomain.BaseDirectory + "MyDatabase.sqlite");
            }
            SQLiteConnection sqlite_conn =
              new SQLiteConnection("Data Source=" + AppDomain.CurrentDomain.BaseDirectory + "MyDatabase.sqlite;Version=3;");
            // open the connection:
            sqlite_conn.Open();

            SQLiteCommand sqlite_cmd = sqlite_conn.CreateCommand();

            // Let the SQLiteCommand object know our SQL-Query:
            // These are the original tables within the database
            // Later alterations can be found below
            sqlite_cmd.CommandText = @"CREATE TABLE IF NOT EXISTS [Board] (
                [Id]    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                [Title] NVARCHAR(100) NOT NULL
                ); ";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = @"CREATE TABLE IF NOT EXISTS [CardCollection] (
                [Id]      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                [Title]   NVARCHAR (100) NOT NULL,
                [BoardId] INT            NOT NULL,
                FOREIGN KEY (BoardId) REFERENCES Board(Id) ON DELETE CASCADE
            ); ";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = @"CREATE TABLE IF NOT EXISTS [Card] (
                [Id]               INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                [Title]            NVARCHAR (100) NOT NULL,
                [Description]      NVARCHAR (256) NOT NULL,
                [CardCollectionId] INT            NOT NULL,
                FOREIGN KEY (CardCollectionId) REFERENCES CardCollection(Id) ON DELETE CASCADE
            ); ";
            sqlite_cmd.ExecuteNonQuery();

            //sqlite_cmd.CommandText = @"CREATE TABLE IF NOT EXISTS [Image] (
            //    [Id]               INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            //    [Data]            BLOB NOT NULL,
            //    [CardId] INT            NOT NULL,
            //    FOREIGN KEY (CardId) REFERENCES Card(Id) ON DELETE CASCADE
            //); ";
            //sqlite_cmd.ExecuteNonQuery();

            // altering tables
            // done in try catch because ColumnExistsInTable function breaks program with database commit errors
            try
            {
                sqlite_cmd.CommandText = @"ALTER TABLE Board
                    ADD [Password] NVARCHAR (100);";
                sqlite_cmd.ExecuteNonQuery();
            }
            catch (SQLiteException e) { }

            try
            {
                sqlite_cmd.CommandText = @"ALTER TABLE Card
                    ADD [ImgData] BLOB;";
                sqlite_cmd.ExecuteNonQuery();
            }
            catch (SQLiteException e) { }

            // Web API configuration and services  
            // Web API routes 
            config.MapHttpAttributeRoutes();
            config.EnableCors();

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new System.Net.Http.Headers.MediaTypeHeaderValue("text/html"));
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            config.Formatters.JsonFormatter.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}/{action}",
                defaults: new { id = RouteParameter.Optional, action = RouteParameter.Optional }
            );
        }
    }
}
