import { ClubUpdateOrCreate } from "../types";

export async function createClub(club: ClubUpdateOrCreate) {
  const { escudo, ...rest } = club;
  const req = {
    ...rest,
    geocode: { latitude: club.geocode?.lat, longitude: club.geocode?.lng },
  };
  const response = await fetch("http://localhost:3000/api/clube", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  const data = await response.json();
  if (escudo) {
    const formData = new FormData();
    formData.append("escudo", escudo);
    const res = await fetch(`http://localhost:3000/api/clube/icon/${data.id}`, {
      method: "POST",
      body: formData,
    });

    return await res.json();
  }

  return data;
}

export async function updateClub(club: ClubUpdateOrCreate) {
  const { escudo, ...rest } = club;
  const req = {
    ...rest,
    geocode: { longitude: club.geocode?.lng, latitude: club.geocode?.lat },
  };
  const response = await fetch(`http://localhost:3000/api/clube/${rest.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  const data = await response.json();
  if (escudo) {
    const formData = new FormData();
    formData.append("escudo", escudo);
    const res = await fetch(`http://localhost:3000/api/clube/icon/${data.id}`, {
      method: "POST",
      body: formData,
    });

    return await res.json();
  }

  return data;
}

export async function deleteClub(id: string) {
  const response = await fetch(`http://localhost:3000/api/clube/${id}`, {
    method: "DELETE",
  });

  return await response.json();
}

export async function fetchClubs() {
  const response = await fetch("http://localhost:3000/api/clube");
  return await response.json();
}
