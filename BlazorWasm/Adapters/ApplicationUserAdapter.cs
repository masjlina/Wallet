using System.Text;
using BlazorWasm.Adapters.IAdapters;
using BusinessLogic.DTOs;
using Common;
using Newtonsoft.Json;

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
        return JsonConvert.DeserializeObject<ApplicationUserDTO>(content);
    }

    public async Task<bool> Update(ApplicationUserDTO applicationUserDTO)
    {
        var content = JsonConvert.SerializeObject(applicationUserDTO);
        var bodyContent = new StringContent(content, Encoding.UTF8, "application/json");
        var response = await _httpClient.PatchAsync($"api/{EndpointName.ApplicationUser}", bodyContent);

        if (response.IsSuccessStatusCode)
            return true;
        else
            return false;
        
    }
}