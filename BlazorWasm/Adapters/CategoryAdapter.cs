using BlazorWasm.Adapters.IAdapters;
using BusinessLogic.DTOs;
using Common;

namespace BlazorWasm.Adapters;

public class CategoryAdapter : GenericAdapter<CategoryDTO>
{
    public CategoryAdapter(HttpClient httpClient) : base(httpClient, EndpointName.Category)
    {
    }
}
