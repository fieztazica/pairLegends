using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class testForeign : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Match",
                columns: table => new
                {
                    PLUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BeginAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Tiles = table.Column<int>(type: "int", nullable: false),
                    TilesDone = table.Column<int>(type: "int", nullable: false),
                    Champs = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Match", x => new { x.PLUserId, x.BeginAt });
                    table.ForeignKey(
                        name: "FK_Match_AspNetUsers_PLUserId",
                        column: x => x.PLUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Match");
        }
    }
}
