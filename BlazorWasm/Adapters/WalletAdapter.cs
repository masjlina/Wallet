using BlazorWasm.Adapters.IAdapters;
using BusinessLogic.DTOs;
using Common;

namespace BlazorWasm.Adapters;

public class WalletAdapter : GenericAdapter<WalletDTO>
{
    public WalletAdapter(HttpClient httpClient) : base(httpClient, EndpointName.Wallet)
    {
    }
}