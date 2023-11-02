using LoanAccelerator.Models;

namespace LoanAccelerator.Tests
{
    internal class loandocument : LoanDocument
    {
        public int documentid { get; set; }
        public int loanid { get; set; }
        public string documentlink { get; set; }
    }
}