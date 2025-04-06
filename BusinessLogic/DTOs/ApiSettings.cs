namespace BusinessLogic.DTOs;

public class ApiSettings
{
    public string SigningKey { get; set; }
    public string[] ValidAudiences { get; set; }
    public string ValidIssuer { get; set; }
}