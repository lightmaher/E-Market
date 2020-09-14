using Microsoft.EntityFrameworkCore.Migrations;

namespace Market_Api.Migrations
{
    public partial class nosaa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "BasketId",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "BasketId1",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_BasketId1",
                table: "Orders",
                column: "BasketId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Baskets_BasketId1",
                table: "Orders",
                column: "BasketId1",
                principalTable: "Baskets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Baskets_BasketId1",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_BasketId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "BasketId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "BasketId1",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "basketItems",
                type: "int",
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
    }
}
