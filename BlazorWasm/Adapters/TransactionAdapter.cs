using BlazorWasm.Adapters.IAdapters;
using BusinessLogic.DTOs;
using Common;

namespace BlazorWasm.Adapters;

public class TransactionAdapter : GenericAdapter<TransactionDTO>
{
    public TransactionAdapter(HttpClient httpClient) : base(httpClient, EndpointName.Transaction)
    {
    }
}