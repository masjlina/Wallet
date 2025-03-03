using BlazorWasm.Adapters.IAdapters;
using BusinessLogic.DTOs;
using Common;

namespace BlazorWasm.Adapters;

public class CreditCardAdapter : GenericAdapter<CreditCardDTO>
{
    public CreditCardAdapter(HttpClient httpClient) : base(httpClient, EndpointName.CreditCard)
    {
    }
}