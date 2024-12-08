export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const respData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to Fetch Places.');
    }

    return respData.places;

}

export async function fetchUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const respData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to Fetch User Places.');
    }

    return respData.places;

}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const respData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to UPDATE User Places.');
    }

    return respData.message;

}