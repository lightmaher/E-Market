using Microsoft.EntityFrameworkCore.Migrations;

namespace Market_Api.Migrations
{
    public partial class koko : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Baskets_BasketId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_BasketId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "BasketId",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "basketItems",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_basketItems_OrderId",
                table: "basketItems",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_basketItems_Orders_OrderId",
                table: "basketItems",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_basketItems_Orders_OrderId",
                table: "basketItems");

            migrationBuilder.DropIndex(
                name: "IX_basketItems_OrderId",
                table: "basketItems");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "basketItems");

            migrationBuilder.AddColumn<string>(
                name: "BasketId",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_BasketId",
                table: "Orders",
                column: "BasketId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Baskets_BasketId",
                table: "Orders",
                column: "BasketId",
                principalTable: "Baskets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
