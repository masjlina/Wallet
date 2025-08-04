using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public abstract class BaseEntity : IEntity<int>
{
    [Key]
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}