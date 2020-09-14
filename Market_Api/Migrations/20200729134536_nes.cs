using Microsoft.EntityFrameworkCore.Migrations;

namespace Market_Api.Migrations
{
    public partial class nes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "basketItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "basketItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
