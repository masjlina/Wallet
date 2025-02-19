using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddConstraintToTransactionFKsWalletOrCreditCardIds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "CK_Transactions_WalletOrCreditCard",
                table: "Transactions",
                sql: "(\"WalletId\" IS NOT NULL AND \"CreditCardId\" IS NULL) OR (\"WalletId\" IS NULL AND \"CreditCardId\" IS NOT NULL)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Transactions_WalletOrCreditCard",
                table: "Transactions");
        }
    }
}
