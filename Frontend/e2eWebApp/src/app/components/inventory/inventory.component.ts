// src/app/components/inventory/inventory.component.ts

import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  inventories: any[] = []; // Declare the inventories array
  products: any[] = []; // Declare the products array
  newInventoryName: string = ''; // Declare the newInventoryName property

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    debugger;
    this.getInventories(); // Fetch inventories when component loads
  }

  // Fetch inventories from the service
  getInventories(): void {
    debugger;
    this.inventoryService.getInventories().subscribe((data: any) => {
      this.inventories = data;
    });
  }

  // Fetch products from the inventory
  viewProducts(inventoryId: number): void {
    this.inventoryService.getProducts(inventoryId).subscribe((data: any) => {
      this.products = data;
    });
  }

  // Add a new inventory
  addInventory(): void {
    if (this.newInventoryName.trim()) {
      this.inventoryService
        .addInventory(this.newInventoryName)
        .subscribe(() => {
          this.getInventories(); // Refresh inventories after adding a new one
          this.newInventoryName = ''; // Clear input field after adding
        });
    }
  }
}
