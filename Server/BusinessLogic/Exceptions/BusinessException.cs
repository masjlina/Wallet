using System.Net;

namespace BusinessLogic.Exceptions;

public class BusinessException(string message, HttpStatusCode statusCode) : Exception(message)
{
    public HttpStatusCode StatusCode { get; } = statusCode;
}