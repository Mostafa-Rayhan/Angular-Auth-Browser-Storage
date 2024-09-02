import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  jsonData: any;
  tableData: { name: string, value: any }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.jsonData = this.authService.getStoredJsonData();
    if (this.jsonData) {
      this.convertJsonToTable(this.jsonData);
    }
  }


  convertJsonToTable(data: any, parentKey: string = ''): void {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        const value = data[key];
  
        // Check if the value is an array
        if (Array.isArray(value)) {
          value.forEach((element, index) => {
            const arrayKey = `${fullKey}[${index}]`;
            if (typeof element === 'object' && element !== null) {
              this.convertJsonToTable(element, arrayKey);
            } else {
              this.tableData.push({ name: arrayKey, value: element });
            }
          });
        }
        // Check if the value is an object
        else if (typeof value === 'object' && value !== null) {
          this.convertJsonToTable(value, fullKey);
        }
        // If it's a primitive value, just add it to the table
        else {
          this.tableData.push({ name: fullKey, value });
        }
      }
    }
  }
  
}
