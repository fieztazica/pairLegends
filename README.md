[![Website](https://img.shields.io/website?style=flat&url=https%3A%2F%2Fpair-legends.vercel.app%2F)](https://pair-legends.vercel.app/) ![GitHub top language](https://img.shields.io/github/languages/top/fiezt1492/pairLegends?style=flat) ![GitHub language count](https://img.shields.io/github/languages/count/fiezt1492/pairLegends?style=flat) ![Discord](https://img.shields.io/discord/830110554604961824?style=flat) ![GitHub](https://img.shields.io/github/license/fiezt1492/pairLegends?style=flat)

# Pair Legends

A pikachu alike game with League of Legends champions.

## Tech Stack

|                                                                     Client                                                                     |                                                                                                         Server                                                                                                          |                                                         Authentication                                                          |                                                                                           Database                                                                                            |                                                                                                        Hosting                                                                                                         |
|:---------------------------------------------------------------------------------------------------------------------------------------------: |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |:------------------------------------------------------------------------------------------------------------------------------: |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![ReactJS](https://img.shields.io/badge/18.2.0-61DAFB?style=for-the-badge&logo=react&label=ReactJS&labelColor=20232A)](https://reactjs.org/)  |    [![Asp.Net Core API](https://img.shields.io/badge/6.0.9-ffffff?style=for-the-badge&logo=Asp.Net%20Core%20API&label=Asp.Net%20Core%20API&labelColor=7014e8)](https://dotnet.microsoft.com/en-us/apps/aspnet/apis)     | [![Jwt](https://img.shields.io/badge/Bearer-d63aff?style=for-the-badge&logo=Jwt&label=Jwt&labelColor=000000)](https://jwt.io/)  | [![Azure SQL](https://img.shields.io/badge/SQL-22ffc6?style=for-the-badge&logo=Azure&label=Azure&labelColor=007fff)](https://azure.microsoft.com/en-us/products/azure-sql/#product-overview)  | [![Azure App Service](https://img.shields.io/badge/App%20Service-22d3ff?style=for-the-badge&logo=Azure%20App%20Service&label=Azure&labelColor=007fff)](https://learn.microsoft.com/en-us/azure/app-service/overview/)  |
|          [![MUI](https://img.shields.io/badge/5.0-0081CB?style=for-the-badge&logo=mui&label=MUI&labelColor=FFFFFF)](https://mui.com/)          | [![Entity Framework Core](https://img.shields.io/badge/6.0.9-41ccf5?style=for-the-badge&logo=Entity%20Framework%20Core&label=Entity%20Framework%20Core&labelColor=67217a)](https://learn.microsoft.com/en-us/ef/core/)  |                                                                                                                                 |                                                                                                                                                                                               |                                        [![Vercel](https://img.shields.io/badge/App-ffffff?style=for-the-badge&logo=Vercel&label=Vercel&labelColor=000000)](https://vercel.app/)                                        |
|                                                                                                                                                |                                                                                                                                                                                                                         |                                                                                                                                 |                                                                                                                                                                                               |                                                                                                                                                                                                                        |

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`API_HOST`

and your `appsettings.json` file

```
"ConnectionStrings": {
    "DeployConnection": "yourProductionConnectionString",
    "DefaultConnection": "yourDefaultConnectionString"
  },
  "ApiContacts": {
    "Owner": {
      "Name": "yourName",
      "Url": "yourUrl"
    }
  },
  "JWT": {
    "Key": "yourJWTKey",
    "Issuer": "yourJWTIssuer",
    "Audience": "yourJWTAudience"
  }

```

## Acknowledgements

- [API Swagger Documentation](https://pairlegendscore.azurewebsites.net/)
- [duonghan Pikachu Algorithm  - React Repo](https://github.com/duonghan/pikachu-react)
- [hoangtuanhedspi Pikachu Algorithm -  Java](https://github.com/hoangtuanhedspi/Pika)
- [Pikachu Algorithm](https://cachhoc.net/2014/03/25/thuat-toan-game-pokemon-pikachu/)
- [.NET Core API](https://github.com/Slimaeus/CaroOnline)

## Authors

- [Hoang Tien Dat](https://www.github.com/fiezt1492)
- [Pham Huynh Nhat Truong](https://github.com/phamtruong7302)
- [Huynh Nhat Truong](https://github.com/Schjr46)
- [Le Nguyen Viet Duong](https://github.com/vduong2k2)
