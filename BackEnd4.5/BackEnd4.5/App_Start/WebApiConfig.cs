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
        public static void Register(HttpConfiguration config)
        {
            if (!File.Exists(AppDomain.CurrentDomain.BaseDirectory + "MyDatabase.sqlite"))
            {
                // create a new database connection:
                SQLiteConnection.CreateFile(AppDomain.CurrentDomain.BaseDirectory + "MyDatabase.sqlite");
            }
            SQLiteConnection sqlite_conn =
              new SQLiteConnection("Data Source="+ AppDomain.CurrentDomain.BaseDirectory +"MyDatabase.sqlite;Version=3;");
            // open the connection:
            sqlite_conn.Open();

            SQLiteCommand sqlite_cmd = sqlite_conn.CreateCommand();

            // Let the SQLiteCommand object know our SQL-Query:
            sqlite_cmd.CommandText = @"CREATE TABLE IF NOT EXISTS [Boards] (
                [Id]    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                [Title] NVARCHAR(100) NOT NULL
                ); ";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = @"CREATE TABLE IF NOT EXISTS [CardCollections] (
                [Id]      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                [Title]   NVARCHAR (100) NOT NULL,
                [BoardId] INT            NOT NULL,
                FOREIGN KEY (BoardId) REFERENCES Boards(Id) ON DELETE CASCADE
            ); ";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = @"CREATE TABLE IF NOT EXISTS [Cards] (
                [Id]               INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                [Title]            NVARCHAR (100) NOT NULL,
                [Description]      NVARCHAR (256) NOT NULL,
                [CardCollectionId] INT            NOT NULL,
                FOREIGN KEY (CardCollectionId) REFERENCES CardCollections(Id) ON DELETE CASCADE
            ); ";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = "INSERT INTO Boards (Title) VALUES ('Hello World');";
            sqlite_cmd.ExecuteNonQuery();

            sqlite_cmd.CommandText = "INSERT INTO CardCollections (Title, BoardId) VALUES ('Hello World', 1);";
            sqlite_cmd.ExecuteNonQuery();

            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.EnableCors();

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new System.Net.Http.Headers.MediaTypeHeaderValue("text/html"));
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
