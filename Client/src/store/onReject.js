export default function onReject(response, thunkAPI) {
    if (response.errors) {
        return thunkAPI.rejectWithValue({errors: [...Object.values(response.errors)] ?? []});
    }
}