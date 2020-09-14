using Microsoft.EntityFrameworkCore.Migrations;

namespace Market_Api.Migrations
{
    public partial class xb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_basketItems_Orders_OrderId",
                table: "basketItems");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "basketItems",
                newName: "Orderid");

            migrationBuilder.RenameIndex(
                name: "IX_basketItems_OrderId",
                table: "basketItems",
                newName: "IX_basketItems_Orderid");

            migrationBuilder.AlterColumn<int>(
                name: "Orderid",
                table: "basketItems",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_basketItems_Orders_Orderid",
                table: "basketItems",
                column: "Orderid",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_basketItems_Orders_Orderid",
                table: "basketItems");

            migrationBuilder.RenameColumn(
                name: "Orderid",
                table: "basketItems",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_basketItems_Orderid",
                table: "basketItems",
                newName: "IX_basketItems_OrderId");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "basketItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

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
