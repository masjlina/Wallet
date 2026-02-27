export default function onReject(response, rejectWithValue) {
    if (response.errors) {
        return rejectWithValue({errors: [...Object.values(response.errors)] ?? []});
    }
}