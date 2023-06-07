# Datatable of HRNET

datatable-hrnet is a react library created using create-react-app. It allows you to display data in a dynamic table that can be filtered and sorted.

## Features 

### Display number of rows per page 
You can chose the number of rows per page you want to display via the "entries select options (10, 25, 50, 100)".
The default display is 10 lines per page.

### Search by criteria
You can search easily an entry via the search input form. 

### Sort by columns
You can also sort by colums value (ASC or DESC) via the icons "up" and "down"

### Pagination
You can easily navigate from one page to another via the pagination tab.

## Requirements
- NodeJs 16
- React 18.2.0
- Sass 1.62.1

## Installation
- using NPM : `npm install datatable-hrnet `
- using YARN: `yarn add datatable-hrnet`

## Usage
To use this plugin, you need to import it into your React component.
This plugin requires 2 props: columnTitle and datas.
- columnTitle : corresponds to the name of the datatable columns.
- datas : contains the data for the rows.

### Example (with datas for props)
* MyComponents.jsx

```
import React from "react";
import Datatable from "datatable-hrnet";

function MyComponent() {
    const data = [
        {
            firstname: "Emily",
            lastname: "Johnson",
            dateOfBirth: "12/15/1988",
            startDate: "07/01/2023",
            street: "111 Maple St",
            city: "San Francisco",
            state: "CA",
            code: "94102",
            department: "Sales",
        },
        {
            firstname: "Louis",
            lastname: "Dubois",
            dateOfBirth: "09/15/1985",
            startDate: "02/10/2022",
            street: "Boulevard Montmartre",
            city: "Houston",
            state: "TX",
            code: "77001",
            department: "Sales",
        },
        {
            firstname: "Manon",
            lastname: "Dupuis",
            dateOfBirth: "02/28/1991",
            startDate: "10/18/2021",
            street: "Avenue de l'Opéra",
            city: "Boston",
            state: "MA",
            code: "02101",
            department: "Human Resources",
        },
        {
            firstname: "Noëllie",
            lastname: "Marchand",
            dateOfBirth: "07/15/1986",
            startDate: "04/05/2022",
            street: "Rue des Arts",
            city: "Dallas",
            state: "TX",
            code: "75201",
            department: "Marketing",
        },
    ]

    const title = 
    [ 
        "first name",
        "last name",
        "start date",
        "department",
        "date of birth",
        "street",
        "city",
        "state",
        "zip code"
    ];

    return (
        <div className="mycomponent">
            <Datatable 
                datas = {data} 
                columnTitle = {title}
            />
        </div>
    );
}

export default MyComponent;
````

