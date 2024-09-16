// src/app/services/inventory.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = 'https://localhost:7233/api/inventory'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Helper method to get the token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
    });
  }

  // Get all inventories with the token in the request
  getInventories(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  // Add a new inventory
  addInventory(name: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(
      `${this.apiUrl}/add-inventory?name=${name}`,
      {},
      { headers }
    );
  }

  // Get products by inventory ID
  getProducts(inventoryId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${inventoryId}/products`, { headers });
  }
}
