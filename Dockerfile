FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["Directory.Build.props", "./"]
COPY ["Server/WebAPI/WebAPI.csproj", "Server/WebAPI/"]
COPY ["Server/BusinessLogic/BusinessLogic.csproj", "Server/BusinessLogic/"]
COPY ["Server/DataAccess/DataAccess.csproj", "Server/DataAccess/"]
COPY ["Server/Common/Common.csproj", "Server/Common/"]
RUN dotnet restore "Server/WebAPI/WebAPI.csproj"

COPY . .
WORKDIR /src/Server/WebAPI
RUN dotnet publish "WebAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "WebAPI.dll"]
