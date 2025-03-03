using System.Text;
using System.Text.Json;
using BlazorWasm.Adapters.IAdapters;
using BusinessLogic.DTOs;
using Common;

namespace BlazorWasm.Adapters;

public class ApplicationUserAdapter : IApplicationUserAdapter
{
    private readonly HttpClient _httpClient;
    
    public ApplicationUserAdapter(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ApplicationUserDTO?> GetById(string applicationUserId)
    {
        var response = await _httpClient.GetAsync($"api/{EndpointName.ApplicationUser}/{applicationUserId}");
        
        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        var content = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<ApplicationUserDTO>(content);
    }

    public async Task<bool> Update(ApplicationUserDTO applicationUserDTO)
    {
        var content = JsonSerializer.Serialize(applicationUserDTO);
        var bodyContent = new StringContent(content, Encoding.UTF8, "application/json");
        var response = await _httpClient.PatchAsync($"api/{EndpointName.ApplicationUser}", bodyContent);

        if (response.IsSuccessStatusCode)
            return true;
        else
            return false;
        
    }
}