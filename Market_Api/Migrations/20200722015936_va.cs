﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace Market_Api.Migrations
{
    public partial class va : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasketItem_Baskets_BasketId",
                table: "BasketItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BasketItem",
                table: "BasketItem");

            migrationBuilder.RenameTable(
                name: "BasketItem",
                newName: "basketItems");

            migrationBuilder.RenameIndex(
                name: "IX_BasketItem_BasketId",
                table: "basketItems",
                newName: "IX_basketItems_BasketId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_basketItems",
                table: "basketItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_basketItems_Baskets_BasketId",
                table: "basketItems",
                column: "BasketId",
                principalTable: "Baskets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_basketItems_Baskets_BasketId",
                table: "basketItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_basketItems",
                table: "basketItems");

            migrationBuilder.RenameTable(
                name: "basketItems",
                newName: "BasketItem");

            migrationBuilder.RenameIndex(
                name: "IX_basketItems_BasketId",
                table: "BasketItem",
                newName: "IX_BasketItem_BasketId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BasketItem",
                table: "BasketItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BasketItem_Baskets_BasketId",
                table: "BasketItem",
                column: "BasketId",
                principalTable: "Baskets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
