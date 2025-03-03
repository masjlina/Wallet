using System.Text;
using BlazorWasm.Adapters.IAdapters;
using Newtonsoft.Json;

namespace BlazorWasm.Adapters;

public class GenericAdapter<TDTO> : IGenericAdapter<TDTO> 
    where TDTO : class
{
    private readonly HttpClient _httpClient;
    private readonly string _endpointName;

    public GenericAdapter(HttpClient httpClient, string endpointName)
    {
        _httpClient = httpClient;
        _endpointName = endpointName;
    }
    
    public async Task<TDTO?> GetById(int id)
    {
        var response = await _httpClient.GetAsync($"api/{_endpointName}/{id}");

        if (!response.IsSuccessStatusCode)
        {
            return null;
        }
        
        var content = await response.Content.ReadAsStringAsync();
        var dto = JsonConvert.DeserializeObject<TDTO>(content);
        
        return dto;
    }

    public async Task<IEnumerable<TDTO>> GetAll()
    {
        var response = await _httpClient.GetAsync($"api/{_endpointName}");
        var content = await response.Content.ReadAsStringAsync();

        if (response.IsSuccessStatusCode)
        {
            var dto = JsonConvert.DeserializeObject<IEnumerable<TDTO>>(content);
            return dto;
        }
        
        return new List<TDTO>();
    }

    public async Task<bool> Add(TDTO dto)
    {
        var content = JsonConvert.SerializeObject(dto);
        var bodyContent = new StringContent(content, Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync($"api/{_endpointName}", bodyContent);

        if (response.IsSuccessStatusCode)
            return true;
        
        return false;
    }

    public async Task<bool> Update(TDTO dto)
    {
        var content = JsonConvert.SerializeObject(dto);
        var bodyContent = new StringContent(content, Encoding.UTF8, "application/json");
        var response = await _httpClient.PatchAsync($"api/{_endpointName}", bodyContent);

        if (response.IsSuccessStatusCode)
            return true;
        
        return false;
    }

    public async Task<bool> Delete(int id)
    {
        var response = await _httpClient.DeleteAsync($"api/{_endpointName}/{id}");

        if (response.IsSuccessStatusCode)
            return true;
        
        return false;
    }
}