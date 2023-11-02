using LoanAccelerator.Interface.RepoInterface;
using LoanAccelerator.Models;

namespace LoanAccelerator.Services
{
    public class UpdateStage
    {
        private readonly IRepository<Loan, int> _repo;

        public UpdateStage(IRepository<Loan, int> repo)
        {
            _repo = repo;
        }

        public async Task UpdateStages(int id, int stage)
        {
            var put = await _repo.GetById(id);
            put.Stage = stage;
            await _repo.SaveChangesAsync();

        }
    }
}
