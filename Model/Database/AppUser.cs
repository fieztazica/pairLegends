using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Database
{
    public class AppUser : IdentityUser<Guid>
    {
        public ICollection<Match>? Matches { get; set; }
    }
}